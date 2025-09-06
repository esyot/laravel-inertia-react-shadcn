<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
use App\Models\UserLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function showLoginForm()
    {

        if (Auth::user())
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

            $agent = new Agent();

            UserLog::create([
                'user_id' => Auth::id(),
                'device'  => $agent->platform() . ' - ' . $agent->browser(),
            ]);
            
            $user = \Auth::user();
            $request->session()->put('must_change_password', !$user->is_password_changed);
        
            return redirect()->intended('/dashboard')->with('success', 'Login Successfully.');

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

        return redirect('/login')->with('success','Logout Successfully.');
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = $request->user();
        $user->password = Hash::make($validated['password']);
        $user->is_password_changed = true;
        $user->save();

        return back()->with('success', 'Password updated successfully.');
    }
}