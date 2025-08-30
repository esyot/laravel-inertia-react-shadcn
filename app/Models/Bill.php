<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    /** @use HasFactory<\Database\Factories\BillFactory> */
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'billing_month',
        'amount_due',
        'status',
        'due_date'
    ];

    public function customer()
{
    return $this->belongsTo(Customer::class);
}

public function getComputedStatusAttribute(): string
{
    if (!$this->payment_date) {
        return $this->due_date < now() ? 'Overdue' : 'Unpaid';
    }

    return 'Paid';
}

public function getPenaltyAttribute(): float
{
    if ($this->computed_status !== 'Overdue') return 0;

    $monthsOverdue = now()->diffInMonths(Carbon::parse($this->due_date));
    return $monthsOverdue * 100; // 100 pesos per month
}

public function getTotalAmountDueAttribute(): float
{
    return $this->amount_due + $this->penalty;
}


}
