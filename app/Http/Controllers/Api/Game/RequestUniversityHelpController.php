<?php

namespace App\Http\Controllers\Api\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class RequestUniversityHelpController extends Controller
{
    public function store(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'string', 'digits:4'],
            'question' => ['required', 'string'],
            'options' => ['required', 'array'],
            'timer' => ['required']
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
                'options' => $request->options,
                'timer' => Carbon::parse($request->timer)->format('00:i:s')
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

    public function update(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4'],
            'response' => ['required', 'max_digits:2']
        ]);

        try {
            $roomCode = $request->roomCode;

            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$startedGame->universityHelp) {
                throw new \DomainException('Ajuda universitária não utilizada pelo jogador.');
            }

            $startedGame->universityHelp->response = $request->response;
            $startedGame->universityHelp->save();
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

    public function waitingResponse(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4']
        ]);

        try {
            $roomCode = $request->roomCode;

            $startedGame = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$startedGame) {
                throw new \InvalidArgumentException('Esta sala não existe.');
            }

            if (!$startedGame->universityHelp) {
                throw new \DomainException('Ajuda universitária não utilizada pelo jogador.');
            }
            
            if ($startedGame->universityHelp->response === null) {
                return response()->json(['waiting' => true]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'response' => $startedGame->universityHelp->response
        ]);
    }
}
