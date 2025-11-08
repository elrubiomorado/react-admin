<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    //
    protected $fillable = [
        'level',
    ];

    public function types()
    {
        return $this->belongsToMany(Type::class, 'priority_type');
    }
}
