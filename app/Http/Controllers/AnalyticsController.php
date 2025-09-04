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
        if (!Auth::user()->hasRole('admin')) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('admin/dashboard/page', [
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
                    'latest' => MeterReading::latest()->take(5)->get(),
                ],
            ]
        ]);
    }
}
