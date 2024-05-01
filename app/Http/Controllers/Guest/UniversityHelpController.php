<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;

class UniversityHelpController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        try {
            if (!session('canEntry')) {
                throw new UnauthorizedException('Você não informou uma sala.');
            }

            $roomCode = session('roomCode');

            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$startedGame->universityHelp) {
                throw new \DomainException('Ajuda universitária não utilizada pelo jogador.');
            }

            $universityHelp = $startedGame->universityHelp->where(['response' => null])->get()[0] ?? null;

            if (!$universityHelp) {
                throw new \DomainException('A ajuda universitária já foi utilizada todas as vezes.');
            }
        } catch (\Throwable $th) {
            if ($th instanceof UnauthorizedException) {
                return Redirect::routeError('university-help-code', $th->getMessage());
            }
            if ($th instanceof \InvalidArgumentException || $th instanceof \DomainException) {
                return Redirect::back($th, $th->getMessage());
            }
        }

        return Page::render('Guest/UniversityHelp/UniversityHelp', [
            'question' => $startedGame->universityHelp[0]->question,
            'roomCode' => $roomCode,
            'timer' => $startedGame->universityHelp[0]->timer,
            'options' => $startedGame->universityHelp[0]->options
        ]);
    }
}
