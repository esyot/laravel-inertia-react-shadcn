<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/dashboard', function () {
    return inertia('dashboard/Page', [

    ]);
});

Route::get('/login', function () {
    return inertia('login/page', [

    ]);
});

Route::get('/manage-user', function () {
    return inertia('manage-user/page', [
    ]);
});