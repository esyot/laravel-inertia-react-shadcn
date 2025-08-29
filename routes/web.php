<?php

use App\Http\Controllers\CustomerController;
use App\Models\Customer;
use Illuminate\Http\Request;
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
    return inertia('dashboard/page', [

    ]);
});

//------------->BILL CHECKING 
Route::get('/bill-checking', function () {
    return inertia('bill-checking/page', [
    ]);
});

Route::get('/customers/search', function (Request $request) {
    $query = $request->input('query');

    return Customer::where('code', 'like', "%{$query}%")
        ->orWhere('name', 'like', "%{$query}%")
        ->limit(10)
        ->get();
});

Route::get('/customers/{id}', [CustomerController::class, 'show']);
//------------->BILL CHECKING 

Route::get('/login', function () {
    return inertia('login/page', [

    ]);
});

Route::get('/manage-user', function () {
    return inertia('manage-user/page', [
    ]);
});

Route::get('/payment', function () {
    return inertia('payment/page', [
    ]);
});