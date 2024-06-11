<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Disciplines\Question\Question;
use App\Models\Groups\Games\Game;
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

class PlayingController extends Controller
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

            $acronym = $startedGame->game->acronym;

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
            'timer' => $startedGame->game->timer,
            'questions' => $questions,
            'maximumPoints' => $startedGame->game->maximum_points,
            'gameAcronym' => $acronym
        ]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4'],
            'correctResponses' => ['array'],
            'inMinutes' => ['array'],
            'points' => ['required'],
        ]);

        try {
            $roomCode = $request->roomCode;

            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            $acronym = $startedGame->game->acronym;

            Game::finishGame($request->only([
                'roomCode',
                'correctResponses',
                'inMinutes',
                'points',
            ]), $startedGame);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Não foi possível salvar seu progresso.');
        }

        return FacadesRedirect::route('ranking', ['gameAcronym' => $acronym])
            ->with('status', Toast::success('Pontuação registrada!'));
    }
}
