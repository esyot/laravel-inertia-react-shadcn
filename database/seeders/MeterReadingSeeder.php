<?php

namespace Database\Seeders;

use App\Models\MeterReading;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeterReadingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         MeterReading::create([
            'customer_id' => 1,          // assumes you have a customer with ID 1
            'month' => 'January',
            'year' => 2025,
            'meter_value' => 123.45,
            'created_at' => now(),
        ]);
    }
}
