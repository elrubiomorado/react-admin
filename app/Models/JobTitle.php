<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Team;
class JobTitle extends Model
{
    //asignacion masiva para poder llenar la tabla
    protected $fillable = ['title', 'team_id'];

    public function team(){
        return $this->belongsTo(Team::class);
    }
    public function engineers(){
        return $this->hasMany(Engineer::class);
    }

}
