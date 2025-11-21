<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Calendar extends Model
{

    use HasFactory;
    //Calender
    protected $fillable = [
        'note',
        'date',
        'user_id',
    ];

    // Relacion: un calendario pertenee a un usuario
    /*public function user()
    {
        return $this->belongsTo(User::class);
    }*/
}
