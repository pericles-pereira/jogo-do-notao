<?php

namespace App\Http\Controllers\Admin\Game;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Toast;

class StartGameController extends Controller
{
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

        return FacadesRedirect::route('game.manage')
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
