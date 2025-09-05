<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    protected $fillable = ['name', 'municipal', 'barangay', 'purok', 'status'];

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function meterReadings()
    {
        return $this->hasMany(MeterReading::class);
    }

    protected static function booted()
    {
        static::creating(function ($customer) {
            $municipal = $customer->municipal;
            $barangay = $customer->barangay;
            $purok = $customer->purok; // e.g. "Purok 1"

            $muniCode = strtoupper(substr($municipal, 0, 4));
            $brgyCode = strtoupper(collect(explode(" ", $barangay))->map(fn($w) => substr($w, 0, 1))->implode(""));
            preg_match('/\d+/', $purok, $matches);
            $purokCode = "P" . ($matches[0] ?? 0);
            $randomCode = strtoupper(\Illuminate\Support\Str::random(10));

            $customer->code = "{$muniCode}-{$brgyCode}-{$purokCode}-{$randomCode}";
        });
    }

    public function getCurrentBillAttribute()
    {
        $currentMonth = now()->format('F Y');
        return $this->bills()->where('billing_month', $currentMonth)->first();
    }
}