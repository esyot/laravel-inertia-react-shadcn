<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('profile/page', [
            'user' => $user,
        ]);
    }

    public function updateAvatar(Request $request)
{
    $request->validate([
        'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $user = $request->user();

    // Store new avatar
    $path = $request->file('avatar')->store('avatars', 'public');

    // Delete old one if exists
    if ($user->avatar_url && Storage::disk('public')->exists($user->avatar_url)) {
        Storage::disk('public')->delete($user->avatar_url);
    }

    $user->avatar_url = $path;
    $user->save();

    return redirect()->back()->with('success', 'Profile picture updated successfully.');
}

}
