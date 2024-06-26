<?php

namespace App\Http\Controllers\Admin\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Disciplines\Discipline;
use App\Models\Groups\Games\Game;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Delete;
use Source\Helpers\Models\Search;
use Source\Helpers\Utils\Common\Decimals;
use Source\Helpers\Utils\Common\Str;

class GamesController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        $roomCode = session('roomCode');

        try {
            $group = $request->user()->group;
            $games = Search::allDataInCamel($group->game);
            $questions = Search::allDataInCamel($group->question);
            $startedGames = Search::allDataInCamel($group->startedGame);
            $disciplines = Search::allDataInCamel($group->discipline);

            foreach ($games as $key => $value) {
                $games[$key]['discipline'] = Discipline::find($value['disciplineId'])->name;
            }

            foreach ($startedGames as $key => $value) {
                $startedGames[$key]['game'] = Game::find($value['gameId'])->acronym;
            }

            $finishedGames = Search::allDataInCamel($group->finishedGame);

            foreach ($finishedGames as $key => $value) {
                $finishedGames[$key]['game'] = Game::find($value['gameId'])->acronym;
            }
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Game/Games/Games', [
            'questions' => $questions,
            'games' => $games,
            'startedGames' => $startedGames,
            'roomCode' => $roomCode,
            'finishedGames' => $finishedGames,
            'disciplines' => $disciplines,
        ]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $data = $request->only(array_keys($validation));
            $data['timer'] = Carbon::parse($data['timer'])->format('00:i:s');
            $data['maximumPoints'] = Decimals::numericStringToDecimal($data['maximumPoints']);

            if ($data['copyGame']) {
                $data['questions'] = Game::find($data['copyGame'])->questions;
            }

            $request->user()->group->game()->create(Str::camelToSnake($data));
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Jogo não cadastrado.');
        }

        return Redirect::route('game.manage', 'Jogo cadastrado.');
    }

    public function update(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $game = $request->user()->group->game->find($request->only('id')['id']);

            if (!$game) {
                throw new \Error();
            }

            $data = $request->only(array_keys($validation));
            $data['timer'] = Carbon::parse($data['timer'])->format('00:i:s');
            $data['maximumPoints'] = Decimals::numericStringToDecimal($data['maximumPoints']);

            $game->fill(Str::camelToSnake($data));
            $game->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Jogo não atualizado.');
        }

        return Redirect::route('game.manage', 'Jogo atualizado.');
    }

    public function delete(FormRequest $request): RedirectResponse
    {
        $request->validate(['deleteData' => ['required', 'array']]);
        $data = $request->validationData()['deleteData'];
        $s = count($data) > 1 ? 's' : '';

        try {
            Delete::multipleRecords($data, $request->user()->group->game);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Jogo' . $s . ' não excluído' . $s . '.');
        }

        return Redirect::route('game.manage', 'Jogo' . $s . ' excluído' . $s . '.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'questions' => ['nullable', 'array'],
            'acronym' => ['required', 'max:255'],
            "timer" => ['required'],
            "maximumPoints" => ['required'],
            "disciplineId" => ['required', 'integer'],
            "copyGame" => ['integer', 'nullable']
        ];
    }
}
