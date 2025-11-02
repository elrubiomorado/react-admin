<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    //asignacion masiva
    protected $fillable = ['name'];

    public function JobTitle(){
        //relacion
        return $this->hasMany(JobTitle::class);
    }
}
