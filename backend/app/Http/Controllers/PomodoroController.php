<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pomodoro;

class PomodoroController extends Controller
{
    // GET /api/pomodoro-sessions
    public function index(Request $request)
    {
        $perPage = min(
            max((int) $request->query('per_page', 5), 1),
            50
        );

        return Pomodoro::orderBy('id', 'desc')
                    ->paginate($perPage);
    }

    // GET /api/pomodoro-sessions/{id}
    public function show($id)
    {
        return Pomodoro::findOrFail($id);
    }

    // POST /api/pomodoro-sessions
    // Membuat sesi baru saat user menekan Start
    public function store(Request $request)
    {
     try{
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'mode' => 'required|in:focus,break',
            'duration' => 'required|integer|min:1',
            'started_at' => 'sometimes|nullable|date',
        ]);

        $session = Pomodoro::create([
            'user_id' => $validated['user_id'],
            'mode' => $validated['mode'],
            'duration' => $validated['duration'],
            'started_at' => $validated['started_at'] ?? now(),
            'ended_at' => null,
            'status' => 'running',
        ]);

        return response()->json($session, 201);

     }catch (\Throwable $e) {
        \Log::error('Pomodoro store error: '.$e->getMessage());

        return response()->json([
            'message' => 'Gagal menyimpan sesi Pomodoro',
            'error' => $e->getMessage(),
        ], 500);
    }
    }

    // PUT /api/pomodoro-sessions/{id}
    // Memperbarui sesi saat selesai atau di-reset
    public function update(Request $request, $id)
    {
        $session = Pomodoro::findOrFail($id);

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
    public function destroy($id)
    {
        $session = Pomodoro::findOrFail($id);
        $session->delete();

        return response()->json([
            'message' => 'Pomodoro session deleted'
        ]);
    }
}