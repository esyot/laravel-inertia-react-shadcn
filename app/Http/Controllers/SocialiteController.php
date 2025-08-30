<?php

namespace App\Http\Controllers;

use App\Models\UserInformation;
use App\Models\UserLog;
use Exception;
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

    public function handleProviderCallback($provider)
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

            if ($user)
            {

                Auth::login($user);

                return redirect()->route('home');

            } else
            {
                $socialId = $socialUser->getId();
                $avatarUrl = $socialUser->getAvatar();

                $imageContents = file_get_contents($avatarUrl);
                $filename = 'avatars/' . uniqid() . '.jpg';
                Storage::disk('public')->put($filename, $imageContents);

                $user = User::create([
                    'img' => $filename,
                    'email' => $socialUser->getEmail() ?? Str::random(24),
                    'username' => Str::random(24),
                    'name' => $socialUser->getName(),
                    'password' => Hash::make(Str::random(24)),
                    'signup_method' => $provider,
                    'social_id' => $provider . '_' . $socialId,
                ]);


                $user->assignRole('user');

                Auth::login($user);

                return redirect()->route('dashboard');
            }
        } catch (Exception $e)
        {
            return redirect()->route('login')->with('error', 'Unable to authenticate with ' . ucfirst($provider));
        }
    }
}
