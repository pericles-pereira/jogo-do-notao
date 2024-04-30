<?php

namespace App\Http\Controllers\Api\Admin\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Source\Helpers\Models\Search;

class GameRecordsController extends Controller
{
    public function getGameRecords(FormRequest $request): JsonResponse
    {
        $request->validate([
            'roomCode' => ['required', 'digits:4']
        ]);

        $roomCode = $request->roomCode;

        try {
            $game = StartedGame::where(['room_code' => $roomCode])->get()[0] ?? null;

            if (!$game) {
                return response()->json([
                    'success' => true,
                    'finish' => true
                ]);
            }

            $inGameRecords = Search::allDataInCamel($game->inGameRecord);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'inGameRecords' => $inGameRecords
        ]);
    }
}
