<?php

use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

// socialite
Route::get('/auth/{provider}', [SocialiteController::class, 'redirectToProvider'])->name('social.auth');
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback'])->name('social.callback');


Route::get('/log-out', function () {

    Auth::logout();

    return redirect('/');
});

//Landing page
Route::get('/', function () {
    return inertia('landing/index', [

    ]);
});

Route::get('/instructions', function () {
    return view("instructions.index");
})->name('instructions.index');

Route::get('/instructions/setup', function () {
    return view("instructions.setup");
});


Route::get('/instructions/requirements', function () {
    return view("instructions.requirements");
});

Route::middleware(['auth'])->group(function () {


    Route::get('/dashboard', function () {
        return inertia('dashboard/page', [
        ]);
    })->name('dashboard');


});


Route::get('/login', function () {
    return inertia('login/page', [

    ]);
});

// Route::get('/users', function () {
//     return inertia('users/page', [
//     ]);
// });

Route::get('/transactions', function () {
    return inertia('transactions/page', [
    ]);
});

//LOGIN FOR USERS
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/users', [UserController::class, 'index'])->name('users.page');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

Route::get('/manage-user', function () {
    return inertia('manage-user/page', [
    ]);
});

Route::get('/payment', function () {
    return inertia('payment/page', [
    ]);
});