<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\MeterReading;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        Customer::factory()
            ->count(15)
            ->create()
            ->each(function ($customer) {
                // Create bills and meter readings starting from January 2024 up to current month
                $startDate = Carbon::create(2024, 1, 1);
                $endDate = Carbon::now();
                
                $currentDate = $startDate->copy();
                $previousReading = 1000; // Initial reading
                
                while ($currentDate->lte($endDate)) {
                    $billingMonth = $currentDate->format('F Y');
                    $isCurrent = $currentDate->format('Y-m') === Carbon::now()->format('Y-m');
                    $isFuture = $currentDate->format('Y-m') > Carbon::now()->format('Y-m');
                    
                    // Skip future months
                    if ($isFuture) {
                        $currentDate->addMonth();
                        continue;
                    }
                    
                    // Calculate consumption for this month
                    $currentReading = $previousReading + rand(10, 30);
                    $consumption = $currentReading - $previousReading;
                    
                    // Create bill for this month
                    $bill = Bill::create([
                        'customer_id' => $customer->id,
                        'billing_month' => $billingMonth,
                        'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
                        'status' => $isCurrent ? 'Unpaid' : 'Paid',
                        'payment_date' => $isCurrent ? null : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
                        'amount_due' => $consumption * 11,
                        'total_amount_due' => $consumption * 11,
                    ]);
                    
                    // Create corresponding meter reading
                    MeterReading::create([
                        'customer_id' => $customer->id,
                        'month' => $currentDate->format('F'),
                        'year' => $currentDate->format('Y'),
                        'meter_value' => $currentReading,
                        'consumption' => $consumption,
                        'bill_id' => $bill->id,
                        'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
                    ]);
                    
                    $previousReading = $currentReading;
                    $currentDate->addMonth();
                }
            });
        }
        
        // Customer::factory()
        //     ->count(15)
        //     ->create()
        //     ->each(function ($customer) {
        //         // Create bills starting from January 2024 up to current month
        //         $startDate = Carbon::create(2024, 1, 1); // Start from January 2024
        //         $endDate = Carbon::now();
                
        //         $currentDate = $startDate->copy();
                
        //         while ($currentDate->lte($endDate)) {
        //             $billingMonth = $currentDate->format('F Y');
                    
        //             // Determine if this is the current month
        //             $isCurrent = $currentDate->format('Y-m') === Carbon::now()->format('Y-m');
        //             $isFuture = $currentDate->format('Y-m') > Carbon::now()->format('Y-m');
                    
        //             // Skip future months
        //             if ($isFuture) {
        //                 $currentDate->addMonth();
        //                 continue;
        //             }
                    
        //             // Create bill for this month
        //             Bill::factory()->create([
        //                 'customer_id' => $customer->id,
        //                 'billing_month' => $billingMonth,
        //                 'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
        //                 'status' => $isCurrent ? 'Unpaid' : 'Paid', // Past bills are paid, current is unpaid
        //                 'payment_date' => $isCurrent ? null : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
        //                 'amount_due' => rand(500, 2000), // Random amount for demonstration
        //             ]);
                    
        //             $currentDate->addMonth();
        //         }
        //     });
        // }
}