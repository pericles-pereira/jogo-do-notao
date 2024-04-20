<?php

namespace App\Models\Groups\Games\StartedGames\UniversityHelps;

use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UniversityHelp extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'options'];

    public function setOptionsAttribute($value): void
    {
        $this->attributes['options'] = serialize($value);
    }

    public function getOptionsAttribute($value): array
    {
        return unserialize($value);
    }

    public function startedGame(): BelongsTo
    {
        return $this->belongsTo(StartedGame::class);
    }
}
