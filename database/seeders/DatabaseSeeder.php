<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $this->call(RoleSeeder::class);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');

        $cashier = User::factory()->create([
            'name' => 'Cashier',
            'email' => 'cashier@example.com',
            'password' => Hash::make('password'),
        ]);
        $cashier->assignRole('cashier');

        $auditor = User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => Hash::make('password'),
        ]);
        $auditor->assignRole('auditor');

        $user = User::factory()->create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole('user');


        $this->call(CustomerSeeder::class);
        $this->call(MeterReadingSeeder::class);

    }
}
