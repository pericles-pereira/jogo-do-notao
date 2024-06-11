<?php

namespace App\Http\Controllers\Admin\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Disciplines\Question\Question as QuestionQuestion;
use App\Models\Groups\Games\Game;
use App\Models\Groups\Games\StartedGames\StartedGame;
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

    public function delete(string $roomCode): RedirectResponse
    {
        try {
            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            $points = 0;
            $inMinutes = [];
            $correctResponses = [];
            foreach ($startedGame->inGameRecord as $value) {
                $inMinutes[] = $value->in_minutes;
                $points = $value->points > $points ? $value->points : $points;
                if ($value->response === QuestionQuestion::find($value->question_id)->correct_option) {
                    $correctResponses[] = $value->question_id;
                }
            }

            Game::finishGame([
                'points' => $points,
                'inMinutes' => $inMinutes,
                'correctResponses' => $correctResponses
            ], $startedGame);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            if ($th instanceof \InvalidArgumentException) {
                return Redirect::back($th, $th->getMessage());
            }
            return Redirect::back($th, 'Erro no servidor!');
        }

        return Redirect::route('game.manage', 'Jogo finalizado forçadamente.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            "name" => ['required', 'max:255'],
            "gameId" => ['required', 'integer'],
        ];
    }
}
