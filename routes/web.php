<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

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
    });
});


Route::get('/login', function () {
    return inertia('login/page', [

    ]);
});

Route::get('/users', function () {
    return inertia('users/page', [
    ]);
});

Route::get('/transactions', function () {
    return inertia('transactions/page', [
    ]);
});

//LOGIN FOR USERS
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/manage-user', function () {
    return inertia('manage-user/page', [
    ]);
});

Route::get('/payment', function () {
    return inertia('payment/page', [
    ]);
});