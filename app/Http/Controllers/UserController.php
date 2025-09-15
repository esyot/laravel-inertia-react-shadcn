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
            'name', 'email', 'device', 'code',
        ]);

        $users = User::with('roles')
            ->when($request->filled('name'), fn ($q) =>
                $q->where('name', 'like', '%'.$request->name.'%'))
            ->when($request->filled('email'), fn ($q) =>
                $q->where('email', 'like', '%'.$request->email.'%'))
            ->when($request->filled('code') && Schema::hasColumn('users', 'code'), fn ($q) =>
                $q->where('code', 'like', '%'.$request->code.'%'))
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id'         => $user->id,
                    'name'       => $user->name,
                    'email'      => $user->email,
                    'roles'      => $user->roles->pluck('name')->toArray(),
                    'created_at' => $user->created_at->format('M d, Y h:i A'),
                    'updated_at' => $user->updated_at->format('M d, Y h:i A'),
                ];
            });

        $logs = UserLog::with('user')
            ->when($request->filled('name'), fn ($q) =>
                $q->whereHas('user', fn ($uq) =>
                    $uq->where('name', 'like', '%'.$request->name.'%')))
            ->when($request->filled('email'), fn ($q) =>
                $q->where('email', 'like', '%'.$request->email.'%'))
            ->when($request->filled('device'), fn ($q) =>
                $q->where('device', 'like', '%'.$request->device.'%'))
            ->paginate(10)
            ->through(function ($log) {
                return [
                    'name'      => $log->user->name,
                    'email'    => $log->user->email,
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
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        // Default role = user
        $user->assignRole('user');

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

    public function addRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'roles' => 'array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        $newRoles = collect($validated['roles']);
        $currentRoles = $user->roles->pluck('name');

        $added = $newRoles->diff($currentRoles);
        $removed = $currentRoles->diff($newRoles);

        $user->syncRoles($newRoles);

       $messages = [];

        if ($added->isNotEmpty()) {
            $messages['success'] = 'Added role(s): ' . $added->join(', ');
        }

        if ($removed->isNotEmpty()) {
            $messages['delete'] = 'Removed role(s): ' . $removed->join(', ');
        }

        if (empty($messages)) {
            $messages['success'] = 'Roles updated successfully.';
        }

        return back()->with($messages);
    }

    public function removeRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        if ($user->hasRole($validated['role'])) {
            $user->removeRole($validated['role']);
        }

        return back()->with('delete', 'Role removed successfully.');
    }

}
