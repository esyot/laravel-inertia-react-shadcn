<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MeterReading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
{
    $query = Customer::query()->with(['lastPaidBill', 'lastPaidBill.transaction']);

    if ($request->filled('name')) {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    if ($request->filled('customerCode')) {
        $query->where('code', 'like', '%' . $request->customerCode . '%');
    }

    if ($request->filled('paymentMethod')) {
        $query->whereHas('lastPaidBill.transaction', function ($q) use ($request) {
            $q->where('payment_method', $request->paymentMethod);
        });
    }


    if ($request->filled('startDate')) {
        $query->whereDate('created_at', '>=', $request->startDate);
    }

    if ($request->filled('endDate')) {
        $query->whereDate('created_at', '<=', $request->endDate);
    }

    $customers = $query->orderBy('created_at', 'desc')->paginate(10);


    return Inertia::render('transactions/page', [
        'customers' => $customers,
        'filters'   => $request->only([
            'name',
            'customerCode',
            'paymentMethod',
            'startDate',
            'endDate'
        ]),
    ]);
}








    // Debug price filters
    // if ($request->filled('minPrice')) {
    //     $minPrice = (float) $request->minPrice;
    //     Log::debug('Applying minPrice filter:', ['minPrice' => $minPrice]);
        
    //     $query->whereHas('lastPaidBill', function($q) use ($minPrice) {
    //         $q->where('amount_due', '>=', $minPrice);
    //     });
    // }

    // if ($request->filled('maxPrice')) {
    //     $maxPrice = (float) $request->maxPrice;
    //     Log::debug('Applying maxPrice filter:', ['maxPrice' => $maxPrice]);
        
    //     $query->whereHas('lastPaidBill', function($q) use ($maxPrice) {
    //         $q->where('amount_due', '<=', $maxPrice);
    //     });
    // }

    
    // public function index(Request $request)
    // {
    //     $query = Customer::query()
    //         ->with('lastPaidBill');

    //     if ($request->filled('name'))
    //     {
    //         $query->where('name', 'like', '%' . $request->name . '%');
    //     }

    //     if ($request->filled('startDate'))
    //     {
    //         $query->whereDate('created_at', '>=', $request->startDate);
    //     }

    //     if ($request->filled('endDate'))
    //     {
    //         $query->whereDate('created_at', '<=', $request->endDate);
    //     }

    //     $customers = $query->orderBy('created_at', 'desc')->paginate(10);

    //     return Inertia::render('transactions/page', [
    //         'customers' => $customers,
    //         'filters' => $request->only(['name', 'startDate', 'endDate'])
    //     ]);
    // }
}
