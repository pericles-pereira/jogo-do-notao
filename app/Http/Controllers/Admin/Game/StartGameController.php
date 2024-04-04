<?php

namespace App\Http\Controllers\Admin\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\Game;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Search;
use Source\Helpers\Utils\Common\Toast;

class StartGameController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        $roomCode = session('roomCode');

        try {
            $games = Search::allDataInCamel($request->user()->group->game);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Game/StartGame/StartGame', ['games' => $games, 'roomCode' => $roomCode]);
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

            $data = $request->only('name', 'timer');
            $data['timer'] = Carbon::parse($data['timer'])->format('00:i:s');

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
            "timer" => ['required']
        ];
    }
}
