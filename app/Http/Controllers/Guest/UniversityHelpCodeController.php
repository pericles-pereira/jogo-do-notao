<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Toast;

class UniversityHelpCodeController extends Controller
{
    public function index(): Response
    {
        return Page::render('Guest/UniversityHelpCode/UniversityHelpCode');
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

            $universityHelp = $game->universityHelp;

            if ($universityHelp->response) {
                throw new \DomainException('Este jogador já utilizou a ajuda universitária uma vez.');
            }

            if ($universityHelp->used) {
                throw new \DomainException('Outro universitário já está ajudando este jogador.');
            }

            $universityHelp->used = true;
            $universityHelp->save();
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
