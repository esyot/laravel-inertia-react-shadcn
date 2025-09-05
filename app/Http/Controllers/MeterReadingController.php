<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Meter;
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

        if ($request->filled('prev_meter_value')) {
            $query->where('prev_meter_value', '>=', $request->prev_meter_value);
        }

        if ($request->filled('curr_meter_value')) {
            $query->where('curr_meter_value', '<=', $request->curr_meter_value);
        }

        if ($request->filled('municipal')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('municipal', 'like', '%' . $request->municipal . '%');
            });
        }

        if ($request->filled('barangay')) {
            $query->whereHas('customer', function ($q) use ($request) {
                $q->where('barangay', 'like', '%' . $request->barangay . '%');
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

        $readings->getCollection()->each->append('consumption');
        
        return Inertia::render('meters/page', [
            'readings' => $readings,
            'filters'  => $request->only(['code', 'name', 'meter', 'municipal', 'brgy', 'month', 'year', 'startDate', 'endDate'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_code'     => 'required|exists:customers,code',
            'month'             => 'required|string',
            'year'              => 'required|integer',
            'curr_meter_value'  => 'required|numeric',
        ]);

        $customer = Customer::where('code', $request->customer_code)->firstOrFail();

        $meter = Meter::where('customer_id', $customer->id)->first();
        if (!$meter) {
            return redirect()->back()->with('error', 'No meter found for this customer.');
        }

        $lastReading = MeterReading::where('customer_id', $customer->id)
            ->where('meter_id', $meter->id)
            ->orderBy('year', 'desc')
            ->orderByRaw("FIELD(month, 
                'January','February','March','April','May','June',
                'July','August','September','October','November','December') desc")
            ->first();

        $prevValue = $lastReading ? $lastReading->curr_meter_value : 0;

        MeterReading::create([
            'meter_id'         => $meter->id,
            'customer_id'      => $customer->id,
            'month'            => $request->month,
            'year'             => $request->year,
            'curr_meter_value' => $request->curr_meter_value,
            'prev_meter_value' => $prevValue,
        ]);

        return redirect()->route('meters.page')->with('success', 'Meter reading added.');
    }
    public function destroy($id)
    {
        $reading = MeterReading::findOrFail($id);
        $reading->delete();

        return to_route('meters.page')->with('delete', 'User created successfully!');
    }

    public function customerMeter(Request $request, $customerId)
    {
        $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer|between:1,12'
        ]);

        $year = $request->input('year');
        $month = $request->input('month');
        
        $monthName = date('F', mktime(0, 0, 0, $month, 1));
        
        $readings = MeterReading::where('customer_id', $customerId)
            ->where('year', $year)
            ->where('month', $monthName)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($readings);
    }
}
