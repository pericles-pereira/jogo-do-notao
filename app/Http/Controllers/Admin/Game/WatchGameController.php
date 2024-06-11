<?php

namespace App\Http\Controllers\Admin\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Disciplines\Question\Question;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Str;
use Source\Helpers\Utils\Common\Toast;

class WatchGameController extends Controller
{
    public function show(string $roomCode): Response | RedirectResponse
    {
        try {
            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$startedGame->playing) {
                throw new \DomainException('Esta partida ainda não foi iniciada.');
            }

            $questions = [];
            foreach ($startedGame->game->questions as $value) {
                $questions[] = Str::snakeToCamel(Question::find($value)->toArray());
            }

            usort($questions, fn ($item, $next) => $item['difficulty'] <=> $next['difficulty']);
        } catch (\Throwable $th) {
            if ($th instanceof UnauthorizedException) {
                return Redirect::routeError('room-code', $th->getMessage());
            }
            if ($th instanceof \InvalidArgumentException || $th instanceof \DomainException) {
                return Redirect::back($th, $th->getMessage());
            }
        }

        return Page::render('Admin/Game/Watch/Watch', [
            'roomCode' => $roomCode,
            'timer' => $startedGame->game->timer,
            'questions' => $questions,
            'maximumPoints' => $startedGame->game->maximum_points,
        ]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $game = $request->user()->group->game->find($request->only('gameId')['gameId']);

            if (!$game) {
                throw new \Error();
            }

            $data = $request->only('name');

            $startedGame = $game->startGame($data);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Jogo não iniciado.');
        }

        return FacadesRedirect::route('game.start')
            ->with('status', Toast::success('Jogo iniciado.'))
            ->with('roomCode', $startedGame->room_code);
    }

    private function fieldsAndValidation(): array
    {
        return [
            "name" => ['required', 'max:255'],
            "gameId" => ['required', 'integer'],
        ];
    }
}
