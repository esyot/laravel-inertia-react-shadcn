<?php

namespace App\Http\Controllers;

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
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'month'       => 'required|string',
            'year'        => 'required|integer',
            'meter_value' => 'required|numeric',
        ]);

        MeterReading::create($validated);

      return to_route('meters.page')->with('success', 'User created successfully!');
    }

    public function destroy($id)
    {
        $reading = MeterReading::findOrFail($id);
        $reading->delete();

        return to_route('meters.page')->with('delete', 'User created successfully!');
    }

}
