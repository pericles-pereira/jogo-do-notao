<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'financeiro',
        'estoque',
        'recursos_humanos',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function getAllAvaliablePermissions(): array
    {
        return (new self())->fillable;
    }
}
