<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMethod extends Model
{
    protected $fillable = [
        'name'
    ];



    public function journalContactMethods()
    {
        return $this->hasMany(JournalContactMethod::class);
    }

    public function journals()
    {
        return $this->belongsToMany(Journal::class, JournalContactMethod::class);
    }
}
