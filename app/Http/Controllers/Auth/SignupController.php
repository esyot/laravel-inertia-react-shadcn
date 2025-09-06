<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SignupController extends Controller
{
    public function verifyCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string|exists:customers,code',
        ]);

        return back()->with('success', 'Code verified. Continue registration.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|exists:customers,code',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ]);

        $customer = Customer::where('code', $request->code)->first();
        
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        $user->customers()->attach($customer->id);
        
        $user->assignRole('customer');

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
