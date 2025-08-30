<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
      
        $this->call(RoleSeeder::class);

        // Retrieve roles
        $adminRole    = Role::where('name', 'admin')->first();
        $cashierRole  = Role::where('name', 'cashier')->first();
        $editorRole   = Role::where('name', 'editor')->first();
        $customerRole = Role::where('name', 'customer')->first();

        // Create users and assign roles
        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->roles()->attach($adminRole);

        $cashier = User::factory()->create([
            'name' => 'Cashier',
            'email' => 'cashier@example.com',
            'password' => Hash::make('password'),
        ]);
        $cashier->roles()->attach($cashierRole);

        $editor = User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => Hash::make('password'),
        ]);
        $editor->roles()->attach($editorRole);

        $customer = User::factory()->create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
        ]);
        $customer->roles()->attach($customerRole);

       
        $this->call(CustomerSeeder::class);
    }
}
