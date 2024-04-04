<?php

namespace App\Models\Groups\Category\Question;

use App\Models\Groups\Category\Category;
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
        'category_id',
        'difficulty'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
