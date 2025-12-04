<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarDay extends Model
{
    protected $table = 'calendar_days';

    protected $fillable = [
        'calendar_id',
        'user_id',
        'date',
        'shift_type',
        'color',
        'note',
    ];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }
}
