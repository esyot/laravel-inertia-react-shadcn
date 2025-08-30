<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        $users = User::orderBy('name', 'asc')->get();

        return Inertia::render('users/page', [
            'users' => $users
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
