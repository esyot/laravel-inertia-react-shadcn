<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLog;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only([
            'name', 'email', 'social_id', 'device', 'code',
        ]);

        $users = User::with('roles')
            ->when($request->filled('name'), fn ($q) =>
                $q->where('name', 'like', '%'.$request->name.'%'))
            ->when($request->filled('email'), fn ($q) =>
                $q->where('email', 'like', '%'.$request->email.'%'))
            ->when($request->filled('social_id'), fn ($q) =>
                $q->where('social_id', 'like', '%'.$request->social_id.'%'))
            ->when($request->filled('code') && Schema::hasColumn('users', 'code'), fn ($q) =>
                $q->where('code', 'like', '%'.$request->code.'%'))
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id'         => $user->id,
                    'name'       => $user->name,
                    'email'      => $user->email,
                    'social_id'  => $user->social_id ?: '',
                    'role'       => $user->roles->first()->name ?? 'No role',
                    'created_at' => $user->created_at->format('M d, Y h:i A'),
                    'updated_at' => $user->updated_at->format('M d, Y h:i A'),
                ];
            });

        $logs = UserLog::with('user')
            ->when($request->filled('name'), fn ($q) =>
                $q->whereHas('user', fn ($uq) =>
                    $uq->where('name', 'like', '%'.$request->name.'%')))
            ->when($request->filled('device'), fn ($q) =>
                $q->where('device', 'like', '%'.$request->device.'%'))
            ->paginate(10)
            ->through(function ($log) {
                return [
                    'name'      => $log->user->name,
                    'device'    => $log->device,
                    'timestamp' => $log->created_at->format('M d, Y h:i A'),
                ];
            });

        return Inertia::render('users/page', [
            'users'   => $users,
            'logs'    => $logs,
            'filters' => $filters,
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

    public function updatePassword(Request $request)
{
    $request->validate([
        'new_password' => 'required|min:8|confirmed',
    ]);

    $user = Auth::user();

    $user->update([
        'password' => Hash::make($request->new_password),
        'is_password_changed' => false
    ]);

    return back()->with('success', 'Password updated successfully!');
}

}