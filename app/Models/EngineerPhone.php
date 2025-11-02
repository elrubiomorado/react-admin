<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngineerPhone extends Model
{
    //
    protected $fillable = [
        'phone',
        'engineer_id'
    ];

    public function Engineer(){
        return $this->belongsTo(Engineer::class);
    }

}
