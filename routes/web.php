<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return inertia('dashboard/index', [

    ]);
});

Route::get('/instructions', function () {
    return view("instructions");
});


Route::get('/dashboard', function () {
    return inertia('dashboard/index', [

    ]);
});
