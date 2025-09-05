<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Meter;
use App\Models\MeterReading;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MeterReadingSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $startDate = Carbon::create(2024, 1, 1);
        $endDate = Carbon::now();

        foreach ($customers as $customer)
        {
            $meter = Meter::where('customer_id', $customer->id)->first();

            if (!$meter)
                continue;

            $previousReading = 1000;
            $currentDate = $startDate->copy();

            while ($currentDate->lte($endDate))
            {
                $month = $currentDate->format('F');
                $year = $currentDate->year;
                $billingMonth = $currentDate->format('F Y');

                $currentReading = $previousReading + rand(10, 30);
                $consumption = $currentReading - $previousReading;

                // Create meter reading
                $meterReading = MeterReading::create([
                    'meter_id' => $meter->id,
                    'customer_id' => $customer->id,
                    'month' => $month,
                    'year' => $year,
                    'prev_meter_value' => $previousReading,
                    'curr_meter_value' => $currentReading,
                    'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
                ]);

                // Create bill
                $isCurrentMonth = $currentDate->format('Y-m') === Carbon::now()->format('Y-m');
                $amountDue = $consumption * 11;

                Bill::create([
                    'customer_id' => $customer->id,
                    'meter_reading_id' => $meterReading->id,
                    'billing_month' => $billingMonth,
                    'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
                    'status' => $isCurrentMonth ? 'Unpaid' : 'Paid',
                    'payment_date' => $isCurrentMonth
                        ? null
                        : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
                    'amount_due' => $amountDue,
                    'penalty' => 0,
                    'total_amount_due' => $amountDue,
                ]);

                $previousReading = $currentReading;
                $currentDate->addMonth();
            }
        }
    }
}
