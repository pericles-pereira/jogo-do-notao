<?php

namespace App\Http\Controllers\Api\Game;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\Game;
use Illuminate\Http\JsonResponse;
use Source\Helpers\Models\Search;

class RankingController extends Controller
{
    public function getFinishedGames(string $gameAcronym): JsonResponse
    {
        try {
            $game = Game::where(['acronym' => $gameAcronym])->get()[0] ?? null;

            if (!$game) {
                throw new \InvalidArgumentException('Este jogo não existe.');
            }

            $finishedGames = Search::allDataInCamel($game->finishedGame);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'finishedGames' => $finishedGames
        ]);
    }
}
