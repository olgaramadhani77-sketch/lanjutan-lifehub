<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcoQuest extends Model
{
    protected $table = 'eco_quest';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'claimed',
    ];

    protected $casts = [
        'claimed' => 'nullable|in:claimed,not_claimed',
    ];
}