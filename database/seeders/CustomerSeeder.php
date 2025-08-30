<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Customer;
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
            ->count(10)
            ->create()
            ->each(function ($customer) {
                Bill::factory()->current()->create([
                    'customer_id' => $customer->id,
                ]);

                foreach (range(1, 5) as $i) {
                    Bill::factory()->past($i)->create([
                        'customer_id' => $customer->id,
                    ]);
                }
            });
    }
}
