<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\MeterReading;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class POSController extends Controller
{

    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->filled('code'))
        {
            $query->where('code', 'like', '%' . $request->code . '%');
        }

        if ($request->filled('name'))
        {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('municipal'))
        {
            $query->where('municipal', 'like', '%' . $request->municipal . '%');
        }

        if ($request->filled('barangay'))
        {
            $query->where('barangay', 'like', '%' . $request->barangay . '%');
        }

        $customers = $query->orderBy('name')->paginate(10);

        return Inertia::render('pos/page', [
            'customers' => $customers,
            'filters' => $request->only(['code', 'name', 'municipal', 'brgy'])
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
        $customer = Customer::where('code', $code)
        ->with(['meterReadings' => function ($query) {
            $query->whereHas('bill', function ($query) {
                $query->where('status', 'Unpaid');
            })
            ->with('bill')
            ->orderBy('year', 'desc')
            ->orderByRaw("
                FIELD(
                    month,
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ) DESC
            ");
        }])
        ->first();

        if (!$customer) {
            return redirect()->route('pos.index')->with('error', 'Customer not found');
        }

        $customer->meterReadings->transform(function ($reading) {
            $reading->consumption = $reading->consumption;
            return $reading;
        });

        // dd($customer->toArray());

        return Inertia::render('pos/pos-details', [
            'customer'   => $customer,
            'ratePerKwh' => 11,
        ]);
    }

    public function store(Request $request, $billId)
    {
        $bill = Bill::findOrFail($billId);

        $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:gcash,paypal,cash,card',
            'reference_no' => $request->payment_method !== 'cash'
                ? 'required|string'
                : 'nullable|string',
        ]);


        $transactions = Transaction::create([
            'bill_id'       => $bill->id,
            'amount'        => $request->amount,
            'payment_method'=> $request->payment_method,
            'reference_no'  => $request->reference_no,
            'status'        => 'completed',
        ]);

        $bill->update([
            'status'       => 'Paid',
            'payment_date' => now(),
        ]);

        // dd($transactions);
        return redirect()
            ->back()
            ->with('success', 'Bill paid successfully. Transaction ID: ' . $transactions->id);
    }



}
