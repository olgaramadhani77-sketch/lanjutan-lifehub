<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
        'daily_type',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];
}