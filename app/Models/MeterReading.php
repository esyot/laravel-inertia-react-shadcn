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
        'curr_meter_value',
        'prev_meter_value',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }


    public function meter()
    {
        return $this->belongsTo(Meter::class);
    }


    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }


    public function getConsumptionAttribute()
    {
        return abs($this->curr_meter_value - $this->prev_meter_value);
    }

}
