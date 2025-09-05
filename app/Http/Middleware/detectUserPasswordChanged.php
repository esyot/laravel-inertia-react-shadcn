<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class detectUserPasswordChanged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if($user && !$user->is_password_changed) {

        $request->attributes->set('must_change_password', true);

        }
        if ($user && !$user->is_password_changed) {
            if ($request->routeIs(['dashboard','password.update','logout'])) {
                return $next($request);
            }

            return redirect()->route('dashboard');
        }
        return $next($request);
    }
}