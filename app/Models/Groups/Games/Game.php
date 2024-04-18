<?php

namespace App\Models\Groups\Games;

use App\Models\Groups\Category\Question\Question;
use App\Models\Groups\Games\StartedGames\StartedGame;
use App\Models\Groups\Group;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'questions', 'acronym'];

    public function setQuestionsAttribute($value)
    {
        $this->attributes['questions'] = serialize($value);
    }

    public function getQuestionsAttribute($value)
    {
        return unserialize($value);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function question(): array|Collection
    {
        return Question::find($this->questions);
    }

    public function startedGame(): HasMany
    {
        return $this->hasMany(StartedGame::class);
    }

    public function startGame(array $data): StartedGame
    {
        return $this->startedGame()->create([
            'player_name' => $data['name'],
            'timer' => $data['timer'],
            'room_code' => StartedGame::generateRoomCode()
        ]);
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
