<?php

namespace Database\Factories;

use App\Models\Meter;
// use App\Models\Customer;
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
// =======
//     /**
//      * Define the model's default state.
//      *
//      * @return array<string, mixed>
//      */
//     public function definition(): array
//     {
//         $date = Carbon::now()->subMonths(rand(0, 12));
//         $meterValue = $this->faker->randomFloat(2, 1000, 5000);
        
//         return [
//             'customer_id' => Customer::factory(),
//             'month' => $date->format('F'),
//             'year' => $date->year,
//             'meter_value' => $meterValue,
//             'consumption' => $this->faker->randomFloat(2, 20, 100),
//             'created_at' => $date,
//             'updated_at' => $date,
//         ];
//     }

//     public function forCustomer($customerId)
//     {
//         return $this->state(fn (array $attributes) => [
//             'customer_id' => $customerId,
//         ]);
//     }

//     public function withConsumptionCalculation($previousReading = null)
//     {
//         return $this->state(function (array $attributes) use ($previousReading) {
//             $consumption = $previousReading 
//                 ? $attributes['meter_value'] - $previousReading->meter_value
//                 : $this->faker->randomFloat(2, 20, 100);
            
//             return [
//                 'consumption' => max(0, $consumption), // Ensure non-negative
//             ];
//         });
//     }
// >>>>>>> staging
}
