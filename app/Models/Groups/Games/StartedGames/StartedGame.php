<?php

namespace App\Models\Groups\Games\StartedGames;

use App\Models\Groups\Games\Game;
use App\Models\Groups\Games\StartedGames\InGameRecords\InGameRecord;
use App\Models\Groups\Games\StartedGames\UniversityHelps\UniversityHelp;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StartedGame extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_name',
        'room_code',
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function universityHelp(): HasMany
    {
        return $this->hasMany(UniversityHelp::class);
    }

    public function inGameRecord(): HasMany
    {
        return $this->hasMany(InGameRecord::class);
    }

    public static function generateRoomCode(): string
    {
        $code = str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT);

        if (boolval(static::where('room_code', $code)->first())) {
            return self::generateRoomCode();
        }

        return $code;
    }
}
