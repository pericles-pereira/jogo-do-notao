<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'statement',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'option_e',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
