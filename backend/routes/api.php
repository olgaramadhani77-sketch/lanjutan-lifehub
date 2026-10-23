<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\EcoQuestController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ============ AUTH (Sanctum) ============
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ============ ROUTE YANG BUTUH LOGIN ============
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/me',      [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Quest
    Route::get('/quests', [QuestController::class, 'index']);
    Route::get('/quests/{id}', [QuestController::class, 'show']);
    Route::post('/quests', [QuestController::class, 'store']);
    Route::put('/quests/{id}', [QuestController::class, 'update']);
    Route::delete('/quests/{id}', [QuestController::class, 'destroy']);

    // Habit
    Route::get('/habits', [HabitController::class, 'index']);
    Route::get('/habits/{id}', [HabitController::class, 'show']);
    Route::post('/habits', [HabitController::class, 'store']);
    Route::put('/habits/{id}', [HabitController::class, 'update']);
    Route::delete('/habits/{id}', [HabitController::class, 'destroy']);
});

// ============ ROUTE PUBLIK (belum diproteksi) ============
// Nanti dipindah ke atas setelah controller-nya diperbaiki

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/pomodoro-sessions', [PomodoroController::class, 'index']);
Route::get('/pomodoro-sessions/{id}', [PomodoroController::class, 'show']);
Route::post('/pomodoro-sessions', [PomodoroController::class, 'store']);
Route::put('/pomodoro-sessions/{id}', [PomodoroController::class, 'update']);
Route::delete('/pomodoro-sessions/{id}', [PomodoroController::class, 'destroy']);

Route::get('/eco-quests', [EcoQuestController::class, 'index']);
Route::get('/eco-quests/{id}', [EcoQuestController::class, 'show']);
Route::post('/eco-quests', [EcoQuestController::class, 'store']);
Route::put('/eco-quests/{id}', [EcoQuestController::class, 'update']);
Route::delete('/eco-quests/{id}', [EcoQuestController::class, 'destroy']);