<?php

namespace App\Models\Groups\Games;

use App\Models\Groups\Disciplines\Discipline;
use App\Models\Groups\Disciplines\Question\Question;
use App\Models\Groups\Games\FinishedGames\FinishedGame;
use App\Models\Groups\Games\StartedGames\InGameRecords\InGameRecord;
use App\Models\Groups\Games\StartedGames\StartedGame;
use App\Models\Groups\Games\StartedGames\UniversityHelps\UniversityHelp;
use App\Models\Groups\Group;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Game extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'questions', 'acronym', 'maximum_points', 'timer', 'discipline_id'];

    public function setQuestionsAttribute($value): void
    {
        $this->attributes['questions'] = serialize($value);
    }

    public function getQuestionsAttribute($value): array
    {
        return unserialize($value);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class);
    }

    public function question(): array|Collection
    {
        return Question::find($this->questions);
    }

    public function startedGame(): HasMany
    {
        return $this->hasMany(StartedGame::class);
    }

    public function inGameRecord(): HasManyThrough
    {
        return $this->hasManyThrough(InGameRecord::class, StartedGame::class);
    }

    public function universityHelp(): HasManyThrough
    {
        return $this->hasManyThrough(UniversityHelp::class, StartedGame::class);
    }

    public function finishedGame(): HasMany
    {
        return $this->hasMany(FinishedGame::class);
    }

    public function startGame(array $data): StartedGame
    {
        return $this->startedGame()->create([
            'player_name' => $data['name'],
            'room_code' => StartedGame::generateRoomCode(),
        ]);
    }

    public static function finishGame(array $data, StartedGame $startedGame): FinishedGame
    {
        return DB::transaction(function () use ($data, $startedGame): FinishedGame {
            $finishedGame = FinishedGame::create([
                'player_name' => $startedGame->player_name,
                'correct_responses' => $data['correctResponses'],
                'in_minutes' => $data['inMinutes'],
                'points' => $data['points'],
                'game_id' => $startedGame->game_id
            ]);

            $startedGame->delete();

            return $finishedGame;
        }, 2);
    }

    #[\Override]
    public function __get($key)
    {
        if ($key === 'question') {
            return $this->question();
        }

        return parent::__get($key);
    }
}
