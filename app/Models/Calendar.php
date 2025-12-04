<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Factories\HasFactory;

class Calendar extends Model
{

 //   use HasFactory;
    //Calender
    protected $table = 'calendars';

    protected $fillable = [
        'user_id',
        'note',
        'date',
        'start_date',
        'shift_pattern',
        'shift_type',
        'color',
    ];

    // Relacion: un calendario pertenee a un usuario
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function days()
    {
        return $this->hasMany(CalendarDay::class);
    }
}
