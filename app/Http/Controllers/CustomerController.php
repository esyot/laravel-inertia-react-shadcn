<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    
    public function search(Request $request)
    {
        $search = $request->query('q', '');

        $customers = Customer::where('code', 'like', "%{$search}%")
            ->limit(10)
            ->get(['id', 'name', 'code']); 

        return response()->json($customers);
    }

    public function show($id)
{
    $customer = Customer::findOrFail($id);

    return inertia('customers/page', [
        'customer' => $customer,
    ]);
}

}
