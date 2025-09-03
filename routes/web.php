<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransactionController;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\SocialiteController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MeterReadingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

Route::middleware(['web'])->group(function () {
    Route::get('/auth/{provider}', [SocialiteController::class, 'redirectToProvider'])->name('social.auth');
    Route::get('/auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback'])->name('social.callback');

});


Route::get('/log-out', function () {

    Auth::logout();

    return redirect('/');
});

//Landing page
Route::get('/', function () {
    return inertia('landing/index', [

    ]);
});


Route::middleware(['auth'])->group(function () {


    Route::get('/dashboard', function () {
        return inertia('dashboard/page', [
        ]);
    })->name('dashboard');

    Route::get('/transactions', function () {
        return inertia('transactions/page', [
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



    Route::get('/users', [UserController::class, 'index'])->name('users.page');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.page');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    Route::put('/user/password/update', [UserController::class, 'updatePassword'])->name('user.password.update');

    //User logs
    Route::delete('/logs/{id}', [UserLogController::class, 'destroy'])->name('users.logs.destroy');
    Route::get('/meters', [MeterReadingController::class, 'index'])->name('meters.page');
    Route::post('/meters', [MeterReadingController::class, 'store'])->name('meters.store');
    Route::delete('/meters/{id}', [MeterReadingController::class, 'destroy'])->name('meters.destroy');

    Route::get('/customers', [CustomerController::class, 'index']);


});


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

Route::get('/customers/{code}', [CustomerController::class, 'show']);
Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');

Route::get('/login', function () {
    return inertia('login/page', [

    ]);
});

// Route::get('/users', function () {
//     return inertia('users/page', [
//     ]);
// });

Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.page');


//LOGIN FOR USERS
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware('auth')->patch('/password', [LoginController::class, 'update']);
    
// Others
Route::get('/instructions', function () {
    return view("instructions.index");
})->name('instructions.index');

Route::get('/instructions/setup', function () {
    return view("instructions.setup");
});

Route::get('/instructions/requirements', function () {
    return view("instructions.requirements");
});