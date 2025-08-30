<?php

namespace Database\Factories;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bill>
 */
class BillFactory extends Factory
{
    protected static $lastPaymentDate = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate billing months in descending order (newest first)
        static $monthOffset = 0;
        $billingDate = Carbon::now()->subMonths($monthOffset);
        $monthOffset++;
        
        $dueDate = $billingDate->copy()->day(14);
        $status = 'Paid';
        $amount = $this->faker->randomFloat(2, 800, 2000);
        
        // Generate payment dates in descending order within each month
        if (self::$lastPaymentDate === null) {
            self::$lastPaymentDate = Carbon::now();
        }
        
        $paymentDate = self::$lastPaymentDate->copy()->subDays(rand(0, 3));
        self::$lastPaymentDate = $paymentDate;
        
        // Ensure payment date is not before the billing month
        if ($paymentDate->lt($billingDate)) {
            $paymentDate = $billingDate->copy()->addDays(rand(0, 10));
        }
        
        // Calculate penalty if paid after due date
        $penalty = 0;
        if ($paymentDate->gt($dueDate)) {
            $monthsOverdue = $paymentDate->diffInMonths($dueDate);
            $penalty = max(1, $monthsOverdue) * 100;
        }

        return [
            'customer_id'       => Customer::factory(),
            'billing_month'     => $billingDate->format('F Y'),
            'amount_due'        => $amount,
            'penalty'           => $penalty,
            'status'            => $status,
            'due_date'          => $dueDate->toDateString(),
            'total_amount_due'  => $amount + $penalty,
            'payment_date'      => $paymentDate->toDateString(),
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function ($bill) {
            // Reset static variables for each new customer/bill set
            self::$lastPaymentDate = null;
        });
    }

    public function current(): static
    {
        $now = Carbon::now();
        $dueDate = $now->copy()->day(14);

        // For current bill, use recent payment date
        $paymentDate = $now->copy()->subDays(rand(0, 5));
        $penalty = 0;

        // Check if payment was late
        if ($paymentDate->gt($dueDate)) {
            $monthsOverdue = $paymentDate->diffInMonths($dueDate);
            $penalty = max(1, $monthsOverdue) * 100;
        }

        return $this->state(fn () => [
            'billing_month' => $now->format('F Y'),
            'due_date'      => $dueDate->toDateString(),
            'payment_date'  => $paymentDate->toDateString(),
            'penalty'       => $penalty,
            'status'        => 'Paid',
        ]);
    }

    /**
     * Force only past bills (before current month)
     */
    public function past(int $monthsAgo = 1): static
    {
        $date = Carbon::now()->subMonths($monthsAgo);
        $dueDate = $date->copy()->day(14);

        // Generate payment date in descending order
        $paymentDate = Carbon::now()->subDays(rand($monthsAgo * 30, ($monthsAgo + 1) * 30));
        
        $penalty = 0;
        if ($paymentDate->gt($dueDate)) {
            $monthsOverdue = $paymentDate->diffInMonths($dueDate);
            $penalty = max(1, $monthsOverdue) * 100;
        }

        return $this->state(fn () => [
            'billing_month' => $date->format('F Y'),
            'due_date'      => $dueDate->toDateString(),
            'payment_date'  => $paymentDate->toDateString(),
            'penalty'       => $penalty,
            'status'        => 'Paid',
        ]);
    }
}