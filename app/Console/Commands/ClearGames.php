<?php

namespace App\Console\Commands;

use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ClearGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-games';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removes all inactive games from the database.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $games = StartedGame::whereDate('created_at', '<', Carbon::now()->subDay())->get();

        $gamesCount = count($games);

        foreach ($games as $game) {
            $game->delete();
        }

        $this->info('Jogos excluídos: ' . $gamesCount);
    }
}
