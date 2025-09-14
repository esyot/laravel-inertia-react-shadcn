<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MeterReading;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query()
            ->with('lastPaidBill');

        if ($request->filled('name'))
        {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('startDate'))
        {
            $query->whereDate('created_at', '>=', $request->startDate);
        }

        if ($request->filled('endDate'))
        {
            $query->whereDate('created_at', '<=', $request->endDate);
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('transactions/page', [
            'customers' => $customers,
            'filters' => $request->only(['name', 'startDate', 'endDate'])
        ]);
    }
}
