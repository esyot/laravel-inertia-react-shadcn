<?php

namespace Database\Seeders;

use App\Models\Meter;
// =======
// use App\Models\Bill;
// use App\Models\Customer;
// >>>>>>> staging
use App\Models\MeterReading;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Seeder;

class MeterReadingSeeder extends Seeder
{
    public function run(): void
    {
// <<<<<<< immanich/feature/admin-dashboard
        $meter = Meter::create([
            'meter_no' => 'MTR-001',
            'customer_id' => 1,
        ]);

        MeterReading::create([
            'meter_id' => $meter->id,
            'month' => 'January',
            'year' => 2025,
            'meter_value' => 123.45,
            'created_at' => now(),
        ]);
// =======
//         $customers = Customer::all();
//         $startDate = Carbon::create(2024, 1, 1);
//         $endDate = Carbon::now();
        
//         foreach ($customers as $customer) {
//             $previousReading = 1000;
            
//             $currentDate = $startDate->copy();
            
//             while ($currentDate->lte($endDate)) {
//                 $month = $currentDate->format('F');
//                 $year = $currentDate->format('Y');
//                 $billingMonth = $currentDate->format('F Y');
                
//                 if ($currentDate->format('Y-m') > Carbon::now()->format('Y-m')) {
//                     $currentDate->addMonth();
//                     continue;
//                 }
                
//                 $currentReading = $previousReading + rand(10, 30);
//                 $consumption = $currentReading - $previousReading;
                
//                 $bill = Bill::firstOrCreate(
//                     [
//                         'customer_id' => $customer->id,
//                         'billing_month' => $billingMonth
//                     ],
//                     [
//                         'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
//                         'status' => $currentDate->format('Y-m') === Carbon::now()->format('Y-m') ? 'Unpaid' : 'Paid',
//                         'payment_date' => $currentDate->format('Y-m') === Carbon::now()->format('Y-m') 
//                             ? null 
//                             : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
//                         'amount_due' => $consumption * 11,
//                         'total_amount_due' => $consumption * 11,
//                     ]
//                 );
                
//                 MeterReading::updateOrCreate(
//                     [
//                         'customer_id' => $customer->id,
//                         'month' => $month,
//                         'year' => $year,
//                     ],
//                     [
//                         'meter_value' => $currentReading,
//                         'consumption' => $consumption,
//                         'bill_id' => $bill->id,
//                         'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
//                     ]
//                 );
                
//                 $previousReading = $currentReading;
//                 $currentDate->addMonth();
//             }
//         }
// >>>>>>> staging
    }
}
