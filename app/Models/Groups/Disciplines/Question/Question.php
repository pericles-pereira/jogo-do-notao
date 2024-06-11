<?php

namespace App\Models\Groups\Disciplines\Question;

use App\Models\Groups\Disciplines\Discipline;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'statement',
        'correct_option',
        'wrong_option1',
        'wrong_option2',
        'wrong_option3',
        'wrong_option4',
        'discipline_id',
        'difficulty'
    ];

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class);
    }
}
