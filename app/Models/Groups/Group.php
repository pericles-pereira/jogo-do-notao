<?php

namespace App\Models\Groups;

use App\Models\Groups\Disciplines\Discipline;
use App\Models\Groups\Disciplines\Question\Question;
use App\Models\Groups\Games\FinishedGames\FinishedGame;
use App\Models\Groups\Games\Game;
use App\Models\Groups\Games\StartedGames\StartedGame;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function user(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function discipline(): HasMany
    {
        return $this->hasMany(Discipline::class);
    }

    public function game(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function question(): HasManyThrough
    {
        return $this->hasManyThrough(Question::class, Discipline::class);
    }

    public function startedGame(): HasManyThrough
    {
        return $this->hasManyThrough(StartedGame::class, Game::class);
    }

    public function finishedGame(): HasManyThrough
    {
        return $this->hasManyThrough(FinishedGame::class, Game::class);
    }
}
