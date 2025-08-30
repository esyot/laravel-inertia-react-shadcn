<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        $adminRole   = Role::where('name', 'admin')->first();
        $cashierRole = Role::where('name', 'cashier')->first();
        $editorRole  = Role::where('name', 'editor')->first();
        $customerRole= Role::where('name', 'customer')->first();

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'address' => 'Tubigon, Bohol',
            'password' => bcrypt('password'),
        ]);
        $admin->roles()->attach($adminRole);

        $cashier = User::factory()->create([
            'name' => 'Cashier',
            'email' => 'cashier@example.com',
            'address' => 'Tubigon, Bohol',
            'password' => bcrypt('password'),
        ]);
        $cashier->roles()->attach($cashierRole);

        $editor = User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'address' => 'Tubigon, Bohol',
            'password' => bcrypt('password'),
        ]);
        $editor->roles()->attach($editorRole);

        $customer = User::factory()->create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'address' => 'Tubigon, Bohol',
            'password' => bcrypt('password'),
        ]);
        $customer->roles()->attach($customerRole);
    }
}