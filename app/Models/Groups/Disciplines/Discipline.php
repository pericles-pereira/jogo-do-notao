<?php

namespace App\Models\Groups\Disciplines;

use App\Models\Groups\Disciplines\Question\Question;
use App\Models\Groups\Games\Game;
use App\Models\Groups\Group;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Discipline extends Model
{
    use HasFactory;

    protected $table = 'disciplines';

    protected $fillable = [
        'name'
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function question(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function game(): HasMany
    {
        return $this->hasMany(Game::class);
    }
}
