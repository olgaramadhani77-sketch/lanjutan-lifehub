<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    // GET /api/quests
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 2), 1),
            50
        );

        // Hanya quest milik user yang login
        return Quest::where('user_id', $request->user()->id)
                    ->orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // GET /api/quests/{id}
    public function show(Request $request, $id)
    {
        $quest = Quest::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        return response()->json($quest);
    }

    // POST /api/quests
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'priority'    => 'nullable|string|max:50',
            'due_date'    => 'nullable|date',
            'completed'   => 'boolean',
        ]);

        $quest = Quest::create([
            'user_id'     => $request->user()->id,   // dari token, bukan body
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'category'    => $validated['category'] ?? null,
            'priority'    => $validated['priority'] ?? 'Medium',
            'due_date'    => $validated['due_date'] ?? null,
            'completed'   => $validated['completed'] ?? false,
        ]);

        return response()->json($quest, 201);
    }

    // PUT /api/quests/{id}
    public function update(Request $request, $id)
    {
        $quest = Quest::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'priority'    => 'nullable|string|max:50',
            'due_date'    => 'nullable|date',
            'completed'   => 'boolean',
        ]);

        $quest->update($validated);

        return response()->json($quest);
    }

    // DELETE /api/quests/{id}
    public function destroy(Request $request, $id)
    {
        $quest = Quest::where('user_id', $request->user()->id)
                      ->findOrFail($id);

        $quest->delete();

        return response()->json([
            'message' => 'Quest deleted'
        ]);
    }
}