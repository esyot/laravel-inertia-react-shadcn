<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MeterReading extends Model
{
    use HasFactory;
    protected $fillable = [
        'meter_id',
        'customer_id',
        'month',
        'year',
        'meter_value',
        'consumption',

    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function meter()
    {
        return $this->belongsTo(Meter::class);
    }

}
