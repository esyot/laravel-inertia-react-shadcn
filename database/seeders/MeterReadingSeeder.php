<?php

namespace Database\Seeders;

use App\Models\Meter;
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
    }
}
