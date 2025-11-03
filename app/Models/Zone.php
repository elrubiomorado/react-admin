<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Place;
class Zone extends Model
{
    protected $fillable = ['name'];

    public function state(){
        return $this->hasMany(State::class);
    }
}
