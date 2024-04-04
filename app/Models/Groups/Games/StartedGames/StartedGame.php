<?php

namespace App\Models\Groups\Games\StartedGames;

use App\Models\Groups\Games\Game;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use phpDocumentor\Reflection\Types\Boolean;

class StartedGame extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_name',
        'room_code',
        'timer'
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
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
