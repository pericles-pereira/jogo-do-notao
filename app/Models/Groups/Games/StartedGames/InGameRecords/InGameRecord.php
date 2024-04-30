<?php

namespace App\Models\Groups\Games\StartedGames\InGameRecords;

use App\Models\Groups\Games\StartedGames\StartedGame;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InGameRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'response',
        'question_id',
    ];

    public function startedGame(): BelongsTo
    {
        return $this->belongsTo(StartedGame::class);
    }
}
