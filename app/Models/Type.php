<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = [
        'name',
    ];

    // Type.php
    public function priorities()
    {
        return $this->belongsToMany(Priority::class, 'priority_type');
    }
    // Un tipo puede estar en muchos cronómetros
    public function cronometros()
    {
        return $this->hasMany(Cronometro::class);
    }
}
