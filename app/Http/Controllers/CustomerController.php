<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{

    public function index()
    {
        $customers = Customer::orderBy('name', 'asc')->get();

        return Inertia::render('customers/page', [
            'customers' => $customers,
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

    //     public function show($id)
// {
//     $customer = Customer::findOrFail($id);

    //     return inertia('customers/page', [
//         'customer' => $customer,
//     ]);
// }

    public function show($code)
    {

        if (!$code)
        {
            return back()->withErrors([
                'error' => 'Code not found!',
            ]);
        }
        $customer = Customer::where('code', '=', $code)
            ->with('bills')
            ->first();

        return Inertia::render('customers/customer', [
            'customer' => $customer
        ]);
    }


}