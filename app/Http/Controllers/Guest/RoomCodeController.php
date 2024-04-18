<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;

class RoomCodeController extends Controller
{
    public function index(): Response
    {
        return Page::render('Guest/RoomCode/RoomCode');
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $request->validate([
            'roomCode' => 'required|integer',
        ]);
        $roomCode = $request->roomCode;

        try {
            $game = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$game) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if ($game->in_game) {
                throw new \DomainException('Essa partida já foi iniciada por outro jogador.');
            }

            $game->in_game = true;
            $game->save();
        } catch (\Throwable $th) {
            if ($th instanceof \InvalidArgumentException || $th instanceof \DomainException) {
                return Redirect::back($th, $th->getMessage());
            }

            return Redirect::back($th, 'Erro no servidor! Jogo não iniciado.');
        }


        return Redirect::route('room-code', 'Jogo iniciado. Boa sorte!!');
    }
}