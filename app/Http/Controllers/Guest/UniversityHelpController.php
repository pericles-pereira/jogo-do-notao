<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Category\Question\Question;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Str;

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

            $questions = [];
            foreach ($startedGame->game->questions as $value) {
                $questions[] = Str::snakeToCamel(Question::find($value)->toArray());
            }

            usort($questions, fn ($item, $next) => $item['difficulty'] <=> $next['difficulty']);
        } catch (\Throwable $th) {
            if ($th instanceof UnauthorizedException) {
                return Redirect::routeError('room-code', $th->getMessage());
            }
            if ($th instanceof \InvalidArgumentException) {
                return Redirect::back($th, $th->getMessage());
            }
        }
        return Page::render('Guest/Playing/Playing', [
            'playerName' => $startedGame->player_name,
            'roomCode' => $roomCode,
            'timer' => $startedGame->timer,
            'questions' => $questions
        ]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        return Redirect::route('playing', 'Jogo iniciado. Boa sorte!!');
    }
}
