<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\Game;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Search;
use Source\Helpers\Utils\Common\Toast;

class UniversityHelpCodeController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        try {
            $games = Search::allDataInCamel(Game::all());
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor!');
        }

        return Page::render('Guest/UniversityHelpCode/UniversityHelpCode', [
            'games' => $games
        ]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $request->validate([
            'roomCode' => 'required|string|digits:4',
        ]);
        $roomCode = $request->roomCode;

        try {
            $game = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$game) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$game->universityHelp) {
                throw new \DomainException('Este jogador ainda não usou a ajuda dos universitários.');
            }

            $universityHelp = $game->universityHelp->filter(function ($item) {
                return !$item->used && $item->response === null;
            })->values()->all();

            if (count($universityHelp) === 0) {
                throw new \DomainException('Esta partida já atingiu seu máximo de usos da ajuda universitária.');
            }

            $universityHelp[0]->used = true;
            $universityHelp[0]->save();
        } catch (\Throwable $th) {
            if ($th instanceof \InvalidArgumentException || $th instanceof \DomainException) {
                return Redirect::back($th, $th->getMessage());
            }

            return Redirect::back($th, 'Erro no servidor! Ajuda não iniciada.');
        }

        return FacadesRedirect::route('university-help')
            ->with('status', Toast::success('Entrando na sala...'))
            ->with('canEntry', true)
            ->with('roomCode', $roomCode);
    }
}
