<?php

namespace App\Http\Controllers;

use App\Models\EcoQuest;
use Illuminate\Http\Request;

class EcoQuestController extends Controller
{
    // get semua quest
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 5), 1),
            50
        );

        return EcoQuest::orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // get satu quest berdasarkan ID
    public function show($id)
    {
        $quest = EcoQuest::findOrFail($id);

        return response()->json($quest);
    }

    // post quest baru
    public function store(Request $request)
    {
    $validated = $request->validate([
        'user_id'     => 'required|exists:users,id',
        'title'       => 'required|string|max:255',
        'description' => 'nullable|string',
        'claimed'     => 'nullable|boolean',
    ]);

    $quest = EcoQuest::create($validated);

    return response()->json($quest, 201);
    }

    // put quest
    public function update(Request $request, $id)
{
    $quest = EcoQuest::findOrFail($id);

    $validated = $request->validate([
        'user_id'     => 'sometimes|exists:users,id',
        'title'       => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'claimed'     => 'sometimes|boolean',
    ]);

    $quest->update($validated);

    return response()->json($quest);
}

    // delete quest
    public function destroy($id)
    {
        $quest = EcoQuest::findOrFail($id);

        $quest->delete();

        return response()->json([
            'message' => 'EcoQuest berhasil dihapus'
        ]);
    }
}
