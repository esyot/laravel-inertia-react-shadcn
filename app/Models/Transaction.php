<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'bill_id',
        'amount',
        'payment_method',
        'reference_no',
    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

}
