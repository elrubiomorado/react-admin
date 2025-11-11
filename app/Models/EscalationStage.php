<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EscalationStage extends Model
{
    protected $fillable = [
        'escalation_levels'
    ];

    public function journal(){
        return $this->hasMany(Journal::class);
    }
}
