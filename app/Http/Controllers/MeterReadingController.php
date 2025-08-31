<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MeterReading;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeterReadingController extends Controller
{
    public function index(Request $request)
    {
        $query = MeterReading::with('customer');


        if ($request->filled('code')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('code', 'like', '%' . $request->code . '%');
            });
        }

        if ($request->filled('name')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->name . '%');
            });
        }

        if ($request->filled('municipal')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('municipal', 'like', '%' . $request->municipal . '%');
            });
        }

        if ($request->filled('brgy')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('brgy', 'like', '%' . $request->brgy . '%');
            });
        }

       if ($request->filled('meter')) {
            $query->where('meter_value', 'like', '%' . $request->meter . '%');
        }

        if ($request->filled('municipal')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('municipal', 'like', '%' . $request->municipal . '%');
            });
        }

        if ($request->filled('brgy')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('brgy', 'like', '%' . $request->brgy . '%');
            });
        }

        if ($request->filled('month')) {
            $query->where('month', $request->month);
        }

        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }

        if ($request->filled('startDate')) {
            $query->whereDate('created_at', '>=', $request->startDate);
        }

        if ($request->filled('endDate')) {
            $query->whereDate('created_at', '<=', $request->endDate);
        }

        $readings = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('meters/page', [
            'readings' => $readings,
            'filters'  => $request->only(['code', 'name', 'meter', 'municipal', 'brgy', 'month', 'year', 'startDate', 'endDate'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_code' => 'required|exists:customers,code',
            'month' => 'required|string',
            'year' => 'required|integer',
            'meter_value' => 'required|numeric',
        ]);

        $customer = Customer::where('code', $request->customer_code)->firstOrFail();

        MeterReading::create([
            'customer_id'  => $customer->id, 
            'month'        => $request->month,
            'year'         => $request->year,
            'meter_value'  => $request->meter_value,
        ]);

        return redirect()->route('meters.page')->with('success', 'Meter reading added.');
    }

    public function destroy($id)
    {
        $reading = MeterReading::findOrFail($id);
        $reading->delete();

        return to_route('meters.page')->with('delete', 'User created successfully!');
    }

}
