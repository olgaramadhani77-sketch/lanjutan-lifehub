<?php

namespace App\Http\Controllers;

use App\Models\EcoQuest;
use Illuminate\Http\Request;

class EcoQuestController extends Controller
{
    // GET /api/eco-quests
    // Hanya mengambil Eco Quest milik user yang login
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 2), 1),
            50
        );

        return EcoQuest::where('user_id', $request->user()->id)
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    // GET /api/eco-quests/{id}
    public function show(Request $request, $id)
    {
        $ecoQuest = EcoQuest::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($ecoQuest);
    }

    // POST /api/eco-quests
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed'   => 'sometimes|boolean',
        ]);

        $ecoQuest = EcoQuest::create([
            'user_id'     => $request->user()->id,
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'completed'   => $validated['completed'] ?? false,
        ]);

        return response()->json($ecoQuest, 201);
    }

    // PUT /api/eco-quests/{id}
    public function update(Request $request, $id)
    {
        $ecoQuest = EcoQuest::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed'   => 'sometimes|boolean',
        ]);

        $ecoQuest->update($validated);

        return response()->json($ecoQuest);
    }

    // DELETE /api/eco-quests/{id}
    public function destroy(Request $request, $id)
    {
        $ecoQuest = EcoQuest::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $ecoQuest->delete();

        return response()->json([
            'message' => 'Eco Quest berhasil dihapus',
        ]);
    }
}
