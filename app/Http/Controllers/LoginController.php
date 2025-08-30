<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm()
    {

        if (Auth::check())
        {
            return redirect()->route('dashboard');
        }

        return inertia('login/page');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials))
        {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');

            // if ($user->roles->contains('name', 'cashier')) {
            //     return redirect()->intended('/cashier/dashboard');
            // }
            // if ($user->roles->contains('name', 'editor')) {
            //     return redirect()->intended('/editor/dashboard');
            // }
            // if ($user->roles->contains('name', 'customer')) {
            //     return redirect()->intended('/customer/dashboard');
            // }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}