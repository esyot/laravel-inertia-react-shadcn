<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{

    public function index()
    {
        $customers = Customer::paginate(10);
        
        return Inertia::render('customers/list', [
            'customers' => $customers
    ]);
    }

    public function search(Request $request)
    {
        $search = $request->query('q', '');

        $customers = Customer::where('code', 'like', "%{$search}%")
            ->limit(10)
            ->get(['id', 'name', 'code']);

        return response()->json($customers);
    }

    public function show($code)
{
    $customer = Customer::where('code', '=', $code)
        ->with('bills')
        ->first();

    if (!$customer) {
        return redirect()->route('customers.index')->with('error', 'Customer not found');
    }

    // Check if user is authenticated and has admin role
    $isAdmin = false;
    
    if (auth()->check()) {
        $isAdmin = auth()->user()->isAdmin();
    }

    return Inertia::render('customers/customer', [
        'customer' => $customer,
        'isAdmin' => $isAdmin
    ]);
}
    
    // public function show($code)
    // {
    //     $customer = Customer::where('code', '=', $code)
    //         ->with('bills')
    //         ->first();

    //     return Inertia::render('customers/customer', [
    //         'customer' => $customer
    //     ]);
    // }
}
