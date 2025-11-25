<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    //Calender
    protected $fillable = [
        'note',
        'date',
        'user_id',
    ];

    // Relacion: un calendario pertenee a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
