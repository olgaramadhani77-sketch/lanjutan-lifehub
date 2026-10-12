<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pomodoro extends Model
{
    protected $table = 'pomodoro_sessions';

    protected $fillable = [
        'user_id',
        'mode',
        'duration',
        'started_at',
        'ended_at',
        'status',
    ];

    protected $casts = [
        'duration' => 'integer',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];
}