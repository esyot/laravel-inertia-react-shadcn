<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Meter;
use App\Models\MeterReading;
use Carbon\Carbon;
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
            ->create();

        $customers = Customer::all();


        foreach ($customers as $customer)
        {
            Meter::factory()->create([
                'customer_id' => $customer->id,
                'meter_no' => 'MTR' . str_pad($customer->id, 5, '0', STR_PAD_LEFT),
                'location' => $customer->purok . ', ' . $customer->barangay . ', ' . $customer->municipal,
            ]);
        }

    }
}

