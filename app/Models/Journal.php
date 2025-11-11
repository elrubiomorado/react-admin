<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    //
    protected $fillable = [
        'stopwatch_id',
        'engineer_id',
        'notified_at',
        'note',
        'escalation_stage_id'
    ];

    public function cronometro()
    {
        return $this->belongsTo(Cronometro::class);
    }
    public function escalationStage(){
        return $this->belongsTo(EscalationStage::class);
    }
    public function engineer(){
        return $this->belongsTo(Engineer::class);
    }
    public function journalContactMethods()
    {
        return $this->hasMany(JournalContactMethod::class);
    }

    public function contactMethods()
    {
        return $this->belongsToMany(ContactMethod::class, JournalContactMethod::class);
    }
}
