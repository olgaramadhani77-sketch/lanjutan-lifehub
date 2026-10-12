<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\EcoQuestController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
//}


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/quests', [QuestController::class, 'index']);
Route::get('/quests/{id}', [QuestController::class, 'show']);
Route::post('/quests', [QuestController::class, 'store']);
Route::put('/quests/{id}', [QuestController::class, 'update']);
Route::delete('/quests/{id}', [QuestController::class, 'destroy']);

Route::get('/habits', [HabitController::class, 'index']);
Route::get('/habits/{id}', [HabitController::class, 'show']);
Route::post('/habits', [HabitController::class, 'store']);
Route::put('/habits/{id}', [HabitController::class, 'update']);
Route::delete('/habits/{id}', [HabitController::class, 'destroy']);

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