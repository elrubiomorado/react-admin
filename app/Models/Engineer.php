<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Engineer extends Model
{
    // asignacion masiva
    protected $fillable = [
        'name',
        'teams_user',
        'email',
        'job_title_id',
        'place_id',
    ];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function jobTitle()
    {
        return $this->belongsTo(JobTitle::class);
    }

    public function phones()
    {
        return $this->hasMany(EngineerPhone::class);
    }
}
