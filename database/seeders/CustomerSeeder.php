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
                // 1 current bill
                Bill::factory()->current()->create([
                    'customer_id' => $customer->id,
                ]);

                // 5 past bills, each in a different month
                foreach (range(1, 5) as $i) {
                    Bill::factory()->past($i)->create([
                        'customer_id' => $customer->id,
                    ]);
                }
            });
    }
}
