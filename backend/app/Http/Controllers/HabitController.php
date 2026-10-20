<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    // GET /api/habits
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 2), 1),
            50
        );

        return Habit::orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // GET /api/habits/{id}
    public function show($id)
    {
        return Habit::findOrFail($id);
    }

    // POST /api/habits
    public function store(Request $request)
    {
        $habit = Habit::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'daily_type' => $request->daily_type,
            'completed' => $request->completed ?? false,
        ]);

        return response()->json($habit, 201);
    }

    // PUT /api/habits/{id}
    public function update(Request $request, $id)
    {
        $habit = Habit::findOrFail($id);

        $habit->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'daily_type' => $request->daily_type,
            'completed' => $request->completed,
        ]);

        return response()->json($habit);
    }

    // DELETE /api/habits/{id}
    public function destroy($id)
    {
        $habit = Habit::findOrFail($id);

        $habit->delete();

        return response()->json([
            'message' => 'Habit deleted'
        ]);
    }
}