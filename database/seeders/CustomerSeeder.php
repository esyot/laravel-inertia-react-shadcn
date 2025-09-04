<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Meter;
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
                // Create a meter for the customer
                $meter = Meter::factory()->create([
                    'customer_id' => $customer->id,
                ]);

                // Generate 15–30 readings for this meter
                $readingCount = rand(15, 30);
                for ($i = 0; $i < $readingCount; $i++) {
                    // Spread readings over past months
                    MeterReading::factory()->create([
                        'meter_id' => $meter->id,
                        'month'    => Carbon::now()->subMonths($i)->format('F'),
                        'year'     => Carbon::now()->subMonths($i)->year,
                    ]);
                }

                // Bills for the customer
                Bill::factory()->current()->create([
                    'customer_id' => $customer->id,
                ]);

                foreach (range(1, 5) as $i) {
                    Bill::factory()->past($i)->create([
                        'customer_id' => $customer->id,
                    ]);
                }
            });

        // Customer::factory()
        //     ->count(15)
        //     ->create()
        //     ->each(function ($customer) {
        //         Bill::factory()->current()->create([
        //             'customer_id' => $customer->id,
        //         ]);

        //         foreach (range(1, 5) as $i) {
        //             Bill::factory()->past($i)->create([
        //                 'customer_id' => $customer->id,
        //             ]);
        //         }
        //     });
    }
}