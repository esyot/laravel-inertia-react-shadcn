<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\UserLog;
class UserLogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $cashier = User::where('email', 'cashier@example.com')->first();
        $auditor = User::where('email', 'editor@example.com')->first();
        $user = User::where('email', 'customer@example.com')->first();

        // Insert logs for each user
        UserLog::create([
            'user_id' => $admin->id,
            'device' => 'Windows 11 - Chrome',
            'created_at' => now()->subMinutes(10),
            'updated_at' => now(),
        ]);

        UserLog::create([
            'user_id' => $cashier->id,
            'device' => 'MacOS - Safari',
            'created_at' => now()->subHours(1),
            'updated_at' => now(),
        ]);

        UserLog::create([
            'user_id' => $auditor->id,
            'device' => 'Android - Firefox',
            'created_at' => now()->subDays(1),
            'updated_at' => now(),
        ]);

        UserLog::create([
            'user_id' => $user->id,
            'device' => 'iPhone - Safari',
            'created_at' => now()->subDays(2),
            'updated_at' => now(),
        ]);
    }
}
