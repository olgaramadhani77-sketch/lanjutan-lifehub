<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    // GET
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 5), 1),
            50
        );

        return Quest::orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    public function show($id)
    {
        return Quest::findOrFail($id);
    }

    // POST
    public function store(Request $request)
    {
        $quest = Quest::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'priority' => $request->priority,
            'due_date' => $request->due_date,
            'completed' => $request->completed ?? false,
        ]);

        return response()->json($quest, 201);
    }

    // PUT
    public function update(Request $request, $id)
    {
        $quest = Quest::findOrFail($id);

        $quest->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'priority' => $request->priority,
            'due_date' => $request->due_date,
            'completed' => $request->completed,
        ]);

        return response()->json($quest);
    }

    // DELETE
    public function destroy($id)
    {
        $quest = Quest::findOrFail($id);

        $quest->delete();

        return response()->json([
            'message' => 'Quest deleted'
        ]);
    }
}