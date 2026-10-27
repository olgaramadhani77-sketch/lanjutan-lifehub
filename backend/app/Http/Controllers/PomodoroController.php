<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pomodoro;

class PomodoroController extends Controller
{
    // GET /api/pomodoro-sessions
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->query('per_page', 10), 1), 50);

        return Pomodoro::where('user_id', $request->user()->id)
                    ->orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // GET /api/pomodoro-sessions/{id}
    public function show(Request $request, $id)
    {
        $session = Pomodoro::where('user_id', $request->user()->id)
                        ->findOrFail($id);

        return response()->json($session);
    }

    // POST /api/pomodoro-sessions
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mode'       => 'required|in:focus,break',
            'duration'   => 'required|integer|min:1',
            'started_at' => 'sometimes|nullable|date',
        ]);

        $session = Pomodoro::create([
            'user_id'    => $request->user()->id,   // dari token
            'mode'       => $validated['mode'],
            'duration'   => $validated['duration'],
            'started_at' => $validated['started_at'] ?? now(),
            'ended_at'   => null,
            'status'     => 'running',
        ]);

        return response()->json($session, 201);
    }

    // PUT /api/pomodoro-sessions/{id}
    public function update(Request $request, $id)
    {
        $session = Pomodoro::where('user_id', $request->user()->id)
                        ->findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|required|in:running,completed,cancelled',
        ]);

        if (isset($validated['status'])) {
            $session->status = $validated['status'];

            if (in_array($validated['status'], ['completed', 'cancelled'])) {
                $session->ended_at = now();
            } else {
                $session->ended_at = null;
            }
        }

        $session->save();

        return response()->json($session);
    }

    // DELETE /api/pomodoro-sessions/{id}
    public function destroy(Request $request, $id)
    {
        $session = Pomodoro::where('user_id', $request->user()->id)
                        ->findOrFail($id);

        $session->delete();

        return response()->json([
            'message' => 'Pomodoro session deleted'
        ]);
    }
}