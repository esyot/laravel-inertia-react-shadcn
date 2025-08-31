<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MeterReading;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeterReadingController extends Controller
{
    public function index()
    {
        $readings = MeterReading::with('customer')->get();
        // dd($readings);

        return Inertia::render('meters/page', [
            'readings' => $readings,
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
