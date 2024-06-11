<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Groups\Games\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Search;

class RankingController extends Controller
{
    public function index(string $gameAcronym): Response | RedirectResponse
    {
        try {
            $finishedGames = [];
            $maxPoints = 0;
            if ($gameAcronym === "all") {
                $games = Game::all();

                foreach ($games as $game) {
                    $finishedGames = array_merge($finishedGames, Search::allDataInCamel($game->finishedGame));
                    if ($game->maximum_points > $maxPoints) {
                        $maxPoints = $game->maximum_points;
                    }
                }
            } else {
                $game = Game::where(['acronym' => $gameAcronym])->get()[0] ?? null;
                if (!$game) {
                    throw new \InvalidArgumentException('Este jogo não existe.');
                }
                $finishedGames = Search::allDataInCamel($game->finishedGame);
            }

        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Guest/Ranking/Ranking', [
            'gameName' => $game ? $game->name : "Ranking Geral",
            'gameAcronym' => $game ? $game->acronym : "All",
            'maximumPoints' => $game ? $game->maximum_points : $maxPoints,
            'finishedGames' => $finishedGames
        ]);
    }
}
