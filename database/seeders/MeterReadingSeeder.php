<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\MeterReading;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Seeder;

class MeterReadingSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $startDate = Carbon::create(2024, 1, 1); // Start from January 2024
        $endDate = Carbon::now();
        
        foreach ($customers as $customer) {
            $previousReading = 1000; // Initial reading in December 2023
            
            $currentDate = $startDate->copy();
            
            while ($currentDate->lte($endDate)) {
                $month = $currentDate->format('F');
                $year = $currentDate->format('Y');
                $billingMonth = $currentDate->format('F Y');
                
                // Skip future months
                if ($currentDate->format('Y-m') > Carbon::now()->format('Y-m')) {
                    $currentDate->addMonth();
                    continue;
                }
                
                $currentReading = $previousReading + rand(10, 30);
                $consumption = $currentReading - $previousReading;
                
                // Find or create the bill for this month to ensure they match
                $bill = Bill::firstOrCreate(
                    [
                        'customer_id' => $customer->id,
                        'billing_month' => $billingMonth
                    ],
                    [
                        'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
                        'status' => $currentDate->format('Y-m') === Carbon::now()->format('Y-m') ? 'Unpaid' : 'Paid',
                        'payment_date' => $currentDate->format('Y-m') === Carbon::now()->format('Y-m') 
                            ? null 
                            : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
                        'amount_due' => $consumption * 11,
                        'total_amount_due' => $consumption * 11,
                    ]
                );
                
                // Create or update meter reading
                MeterReading::updateOrCreate(
                    [
                        'customer_id' => $customer->id,
                        'month' => $month,
                        'year' => $year,
                    ],
                    [
                        'meter_value' => $currentReading,
                        'consumption' => $consumption,
                        'bill_id' => $bill->id,
                        'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
                    ]
                );
                
                $previousReading = $currentReading;
                $currentDate->addMonth();
            }
        }
    }
    
    // public function run(): void
    // {
    //     $customers = Customer::all();
    //     $startDate = Carbon::create(2024, 1, 1); // Start from January 2024
    //     $endDate = Carbon::now();
        
    //     foreach ($customers as $customer) {
    //         $previousReading = 1000; // Initial reading in December 2023
            
    //         $currentDate = $startDate->copy();
            
    //         while ($currentDate->lte($endDate)) {
    //             $month = $currentDate->format('F');
    //             $year = $currentDate->format('Y');
    //             $billingMonth = $currentDate->format('F Y');
                
    //             // Skip future months
    //             if ($currentDate->format('Y-m') > Carbon::now()->format('Y-m')) {
    //                 $currentDate->addMonth();
    //                 continue;
    //             }
                
    //             $currentReading = $previousReading + rand(10, 30);
    //             $consumption = $currentReading - $previousReading;
                
    //             // Find the bill for this month
    //             $bill = Bill::where('customer_id', $customer->id)
    //                         ->where('billing_month', $billingMonth)
    //                         ->first();
                
    //             if ($bill) {
    //                 MeterReading::create([
    //                     'customer_id' => $customer->id,
    //                     'month' => $month,
    //                     'year' => $year,
    //                     'meter_value' => $currentReading,
    //                     'consumption' => $consumption,
    //                     'bill_id' => $bill->id,
    //                     'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
    //                 ]);
                    
    //                 // Update the bill amount based on consumption
    //                 $bill->update([
    //                     'amount_due' => $consumption * 11, // Assuming rate is 11 per kWh
    //                     'total_amount_due' => $consumption * 11,
    //                 ]);
    //             }
                
    //             $previousReading = $currentReading;
    //             $currentDate->addMonth();
    //         }
    //     }
    // }
}
