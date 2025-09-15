<?php

namespace App\Http\Controllers;


use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider)
    {
        try
        {
            return Socialite::driver($provider)->redirect();
        } catch (Exception $e)
        {
            return redirect()->route('login')->with('error', 'Unable to redirect to ' . ucfirst($provider));
        }
    }

    public function handleProviderCallback($provider, Request $request)
    {
        try
        {
            $socialUser = Socialite::driver($provider)->user();
            $email = $socialUser->getEmail();
            $socialId = $socialUser->getId();

            $user = User::where(function ($query) use ($email, $socialId, $provider) {
                if ($email)
                {
                    $query->where('email', $email);
                } else
                {
                    $query->where('social_id', $provider . '_' . $socialId);
                }
            })->first();


            if (!$user)
            {
                $socialId = $socialUser->getId();
                $avatarUrl = $socialUser->getAvatar();

                $imageContents = file_get_contents($avatarUrl);
                $filename = 'avatars/' . uniqid() . '.jpg';
                Storage::disk('public')->put($filename, $imageContents);

                $user = User::create([
                    'img' => $filename,
                    'email' => $socialUser->getEmail() ?? Str::random(24),
                    'username' => $socialUser->getNickname() ?? Str::random(24),
                    'name' => $socialUser->getName(),
                    'password' => Hash::make(Str::random(24)),
                    'signup_method' => $provider,
                    'social_id' => $provider . '_' . $socialId,
                    'is_password_changed' => false,
                ]);

                if ($user)
                {

                    Auth::login($user);
                    $user->assignRole('admin');
                    return redirect()->route('dashboard');
                }


            }


            Auth::login($user);

            $user->assignRole('admin');

            return redirect()->route('home');


        } catch (Exception $e)
        {
            return redirect()->route('login')->with('error', 'Unable to authenticate with ' . ucfirst($provider));
        }
    }
}