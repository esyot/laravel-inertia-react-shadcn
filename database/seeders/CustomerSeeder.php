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
        $ratePerKwh = 11; // Your electricity rate
        
        // Create customers
        $customers = Customer::factory()
            ->count(15)
            ->create();
        
        foreach ($customers as $customer) {
            $startDate = Carbon::create(2024, 1, 1);
            $endDate = Carbon::now();
            
            $currentDate = $startDate->copy();
            $previousReading = 1000; // Starting meter value
            
            while ($currentDate->lte($endDate)) {
                $month = $currentDate->format('F');
                $year = $currentDate->format('Y');
                $billingMonth = $currentDate->format('F Y');
                
                // Skip future months
                if ($currentDate->format('Y-m') > Carbon::now()->format('Y-m')) {
                    $currentDate->addMonth();
                    continue;
                }
                
                // Calculate current reading and consumption
                $currentReading = $previousReading + rand(10, 30);
                $consumption = $currentReading - $previousReading;
                $amountDue = $consumption * $ratePerKwh;
                
                // Determine if this is the current month
                $isCurrentMonth = $currentDate->format('Y-m') === Carbon::now()->format('Y-m');
                
                // Create bill with the calculated amount
                $bill = Bill::create([
                    'customer_id' => $customer->id,
                    'billing_month' => $billingMonth,
                    'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
                    'status' => $isCurrentMonth ? 'Unpaid' : 'Paid',
                    'payment_date' => $isCurrentMonth ? null : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
                    'amount_due' => $amountDue,
                    'penalty' => 0, // No penalty initially
                    'total_amount_due' => $amountDue, // Set to the same as amount_due initially
                ]);
                
                // Create meter reading linked to the bill
                MeterReading::create([
                    'customer_id' => $customer->id,
                    'month' => $month,
                    'year' => $year,
                    'meter_value' => $currentReading,
                    'consumption' => $consumption,
                    'bill_id' => $bill->id,
                    'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
                ]);
                
                // Update for next iteration
                $previousReading = $currentReading;
                $currentDate->addMonth();
            }
        }
    }}
        
        // Customer::factory()
        //     ->count(15)
        //     ->create()
        //     ->each(function ($customer) {
        //         $startDate = Carbon::create(2024, 1, 1);
        //         $endDate = Carbon::now();
                
        //         $currentDate = $startDate->copy();
        //         $previousReading = 1000;
                
        //         while ($currentDate->lte($endDate)) {
        //             $billingMonth = $currentDate->format('F Y');
        //             $isCurrent = $currentDate->format('Y-m') === Carbon::now()->format('Y-m');
        //             $isFuture = $currentDate->format('Y-m') > Carbon::now()->format('Y-m');
                    
        //             if ($isFuture) {
        //                 $currentDate->addMonth();
        //                 continue;
        //             }
                    
        //             $currentReading = $previousReading + rand(10, 30);
        //             $consumption = $currentReading - $previousReading;
                    
        //             $bill = Bill::create([
        //                 'customer_id' => $customer->id,
        //                 'billing_month' => $billingMonth,
        //                 'due_date' => $currentDate->copy()->endOfMonth()->format('Y-m-d'),
        //                 'status' => $isCurrent ? 'Unpaid' : 'Paid',
        //                 'payment_date' => $isCurrent ? null : $currentDate->copy()->endOfMonth()->addDays(rand(1, 15))->format('Y-m-d'),
        //                 'amount_due' => $consumption * 11,
        //                 'total_amount_due' => $consumption * 11,
        //             ]);
                    
        //             MeterReading::create([
        //                 'customer_id' => $customer->id,
        //                 'month' => $currentDate->format('F'),
        //                 'year' => $currentDate->format('Y'),
        //                 'meter_value' => $currentReading,
        //                 'consumption' => $consumption,
        //                 'bill_id' => $bill->id,
        //                 'created_at' => $currentDate->copy()->startOfMonth()->addDays(rand(1, 5)),
        //             ]);
                    
        //             $previousReading = $currentReading;
        //             $currentDate->addMonth();
        //         }
        //     });
        // }