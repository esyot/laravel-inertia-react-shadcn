<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meter extends Model
{
    /** @use HasFactory<\Database\Factories\MeterFactory> */
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'meter_no',
        'location'
    ];
}
