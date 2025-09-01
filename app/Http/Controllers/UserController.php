<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name', 'asc')->get();

        $logs = UserLog::with('user')->get()->map(function ($log) {
            return [
                'name' => $log->user->name,
                'device' => $log->device,
                'timestamp' => $log->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return Inertia::render('users/page', [
            'users' => $users,
            'logs' => $logs,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'social_id' => 'nullable|string|max:255',
            'role' => 'required|in:admin,cashier,editor,customer',
        ]);

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return to_route('users.page')->with('success', 'User created successfully!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return to_route('users.page')->with('delete', 'User deleted successfully!');
    }
}