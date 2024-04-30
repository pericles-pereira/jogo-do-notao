<?php

namespace App\Models\Groups;

use App\Models\Groups\Category\Category;
use App\Models\Groups\Category\Question\Question;
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

    public function category(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function game(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function question(): HasManyThrough
    {
        return $this->hasManyThrough(Question::class, Category::class);
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
