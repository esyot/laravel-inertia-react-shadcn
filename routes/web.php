<?php

use App\Http\Controllers\Auth\SignupController;
// use App\Http\Controllers\SignupController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserLogController;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\SocialiteController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MeterReadingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\POSController;
use Inertia\Inertia;

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

    Route::get('/unauthorized', function () {
        return inertia('fallbacks/unauthorized', [
        ]);
    })->name('fallbacks.unauthorized');

    //DASHBOARD
    Route::get('/dashboard', [AnalyticsController::class, 'index'])->name('dashboard');
    Route::post('/customer-codes', [AnalyticsController::class, 'addCustomerCode'])
        ->name('customer.codes.store');

    Route::delete('/customer-codes/{customer}', [AnalyticsController::class, 'removeCustomerCode'])
        ->name('customer.codes.destroy');
    //END OF DASHBOARD


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

    Route::get('/pos', [POSController::class, 'index'])->name('pos.page');
    Route::get('/pos/{code}', [POSController::class, 'show'])->name('pos.show');
    Route::post('/pos/store/{billId}', [POSController::class, 'store'])->name('pos.store');


    Route::get('/users', [UserController::class, 'index'])->name('users.page');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::post('/users/{user}/roles', [UserController::class, 'addRole']);
    Route::post('/users/{user}/roles/remove', [UserController::class, 'removeRole']);


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


Route::middleware(['auth', 'role:admin'])->group(function () {
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


Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.page');


//LOGIN FOR USERS
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

//SIGN UP
Route::get('/signup', fn () => Inertia::render('auth/sign-up/page'))->name('signup');
Route::post('/signup/verify-code', [SignupController::class, 'verifyCode']);
Route::post('/signup', [SignupController::class, 'store']);


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




//API ROUTES
Route::get('/api/customers/{customer}/meter-readings', [MeterReadingController::class, 'customerMeter'])
    ->name('api.customers.meter-readings');


