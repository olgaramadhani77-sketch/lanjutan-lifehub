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
            max((int) $request->query('per_page', 10), 1),
            50
        );

        // Hanya habit milik user yang login
        return Habit::where('user_id', $request->user()->id)
                    ->orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // GET /api/habits/{id}
    public function show(Request $request, $id)
    {
        $habit = Habit::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        return response()->json($habit);
    }

    // POST /api/habits
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'daily_type'  => 'nullable|string|max:50',
            'completed'   => 'boolean',
        ]);

        $habit = Habit::create([
            'user_id'     => $request->user()->id,
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'category'    => $validated['category'] ?? null,
            'daily_type'  => $validated['daily_type'] ?? 'Daily',
            'completed'   => $validated['completed'] ?? false,
        ]);

        return response()->json($habit, 201);
    }

    // PUT /api/habits/{id}
    public function update(Request $request, $id)
    {
        $habit = Habit::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'daily_type'  => 'nullable|string|max:50',
            'completed'   => 'boolean',
        ]);

        $habit->update($validated);

        return response()->json($habit);
    }

    // DELETE /api/habits/{id}
    public function destroy(Request $request, $id)
    {
        $habit = Habit::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        $habit->delete();

        return response()->json([
            'message' => 'Habit deleted'
        ]);
    }
}