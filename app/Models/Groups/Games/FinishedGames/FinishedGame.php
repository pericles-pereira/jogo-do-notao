<?php

namespace App\Models\Groups\Games\FinishedGames;

use App\Models\Groups\Games\Game;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinishedGame extends Model
{
    use HasFactory;

    protected $fillable = ['player_name', 'correct_responses', 'in_minutes', 'points', 'game_id'];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function setCorrectResponsesAttribute($value): void
    {
        $this->attributes['correct_responses'] = serialize($value);
    }

    public function getCorrectResponsesAttribute($value): array
    {
        return unserialize($value);
    }

    public function setInMinutesAttribute($value): void
    {
        $this->attributes['in_minutes'] = serialize($value);
    }

    public function getInMinutesAttribute($value): array
    {
        return unserialize($value);
    }
}
