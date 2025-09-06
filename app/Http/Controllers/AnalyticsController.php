<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\MeterReading;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
{
    $user = Auth::user();

    if ($user->hasRole('admin')) {
        return Inertia::render('dashboard/admin-dashboard', [
            'analytics' => [
                'customers' => [
                    'total' => Customer::count(),
                    'active' => Customer::where('status', 'Active')->count(),
                    'terminated' => Customer::where('status', 'Terminated')->count(),
                ],
                'bills' => [
                    'total' => Bill::count(),
                    'paid' => Bill::where('status', 'Paid')->count(),
                    'unpaid' => Bill::where('status', 'Unpaid')->count(),
                    'overdue' => Bill::where('status', 'Overdue')->count(),
                    'total_amount_due' => Bill::sum('total_amount_due'),
                ],
                'meter_readings' => [
                    'total' => MeterReading::count(),
                    'latest' => MeterReading::with('meter')->latest()->take(5)->get(),
                ],
            ]
        ]);
    }

    if ($user->hasRole('customer')) {
            $customers = $user->customers()->get();
            
            return Inertia::render('dashboard/customer-dashboard', [
                'customers' => $customers,
                'must_change_password' => false,
            ]);
        }

    return redirect()->route('fallbacks.unauthorized');
}

public function addCustomerCode(Request $request)
{
    $request->validate([
        'code' => 'required|string'
    ]);

    $user = Auth::user();

    $customer = Customer::where('code', $request->code)->first();

    if (!$customer) {
        return back()->withErrors(['code' => 'Invalid customer code.']);
    }

    if (strcasecmp(trim($user->name), trim($customer->name)) !== 0) {
        return back()->withErrors(['code' => 'Name does not match customer record.']);
    }

    if ($user->customers()->where('customers.id', $customer->id)->exists()) {
        return back()->withErrors(['code' => "Customer code {$customer->code} is already added."]);
    }

    $user->customers()->attach($customer->id);

    return back()->with('success', "Customer code {$customer->code} added successfully.");
}


public function removeCustomerCode(Customer $customer)
{
    $user = Auth::user();

    $user->customers()->detach($customer->id);

    return back()->with('success', "Customer code {$customer->code} removed successfully.");
}


}
