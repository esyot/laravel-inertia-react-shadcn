<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Inertia\Inertia;
use App\Models\User;
class UserController extends Controller
{

    public function index()
    {
        $users = User::select('name', 'email', 'address')->get();
        
        return Inertia::render('users/page', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'address' => 'required|string|max:500',
            'password' => 'required|string|min:8',
        ]);
    
        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'],
                'password' => bcrypt($validated['password']),
            ]);

            return redirect()->route('users.index')->with('success', 'User created successfully!');
            
        } catch (\Exception $e) {
            return back()->withErrors(['general' => 'Failed to create user. Please try again.']);
        }
    }
}
