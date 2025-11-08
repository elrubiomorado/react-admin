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
}
