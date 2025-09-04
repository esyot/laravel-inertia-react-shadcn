<?php

namespace Database\Factories;

use App\Models\Meter;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeterReading>
 */
class MeterReadingFactory extends Factory
{
    public function definition(): array
    {
        $date = Carbon::now()->subMonths(rand(0, 12));

        return [
            'meter_id'    => Meter::factory(),
            'month'       => $date->format('F'),
            'year'        => $date->year,
            'meter_value' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}
