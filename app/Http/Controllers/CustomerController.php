<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{

    public function index(Request $request)
    {
        $query = Customer::with('bills');

        if ($request->filled('code')) {
            $query->where('code', 'like', '%' . $request->code . '%');
        }

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('municipal')) {
            $query->where('municipal', 'like', '%' . $request->municipal . '%');
        }

        if ($request->filled('barangay')) {
            $query->where('barangay', 'like', '%' . $request->barangay . '%');
        }

        $customers = $query->orderBy('name')->paginate(10);

        return Inertia::render('customers/page', [
            'customers' => $customers,
            'filters' => $request->only(['code', 'name', 'municipal', 'brgy'])
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'municipal' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'purok' => 'nullable|string|max:255',
            'status' => 'required|in:Active,Terminated',
        ]);
        
        Customer::create($data);

        return to_route('customers.index')->with('success', 'Customer created successfully!');
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

    // Determine if the user is an admin
    $isAdmin = auth()->check() && auth()->user()->isAdmin();

    return Inertia::render('customers/customer', [
        'customer' => $customer,
        'isAdmin' => $isAdmin
    ]);
}


}