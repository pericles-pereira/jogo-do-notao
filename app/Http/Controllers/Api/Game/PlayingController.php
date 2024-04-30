<?php

namespace App\Http\Controllers\Api\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Category\Question\Question;
use App\Models\Groups\Games\Game;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class PlayingController extends Controller
{
    public function setPlayingAttribute(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4']
        ]);

        $roomCode = $request->roomCode;

        try {
            $game = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$game) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            $game->playing = true;
            $game->save();
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function setQuestionResponse(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4'],
            'questionId' => ['required', 'integer'],
            'response' => ['required', 'string'],
            'inMinutes' => ['array'],
            'points' => ['required']
        ]);

        $roomCode = $request->roomCode;

        try {
            $game = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$game) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$game->in_game) {
                throw new \DomainException('Essa partida ainda não foi iniciada.');
            }

            foreach ($game->inGameRecord as $value) {
                if ($value->question_id === $request->questionId) {
                    return response()->json([
                        'success' => true
                    ]);
                }
            }

            $correctResponses = [];
            foreach ($game->inGameRecord as $value) {
                $correctResponses[] = $value->id;
            }   

            $game->inGameRecord()->create([
                'response' => $request->response,
                'question_id' => $request->questionId,
            ]);

            if (Question::find($request->questionId)->correct_option !== $request->response) {
                Game::finishGame(
                    array_merge(
                        $request->only([
                            'roomCode',
                            'inMinutes',
                            'points',
                        ]),
                        ['correctResponses' => $correctResponses]
                    ),
                    $game
                );
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
