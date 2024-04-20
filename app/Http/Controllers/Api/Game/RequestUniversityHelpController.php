<?php

namespace App\Http\Controllers\Api\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class RequestUniversityHelpController extends Controller
{
    public function store(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'string', 'digits:4'],
            'question' => ['required', 'string'],
            'options' => ['required', 'array'],
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

            if ($game->universityHelp) {
                throw new \DomainException('Você não pode utilizar a ajuda dos universitários mais de uma vez.');
            }

            $game->universityHelp()->create([
                'question' => $request->question,
                'options' => $request->options
            ]);
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
