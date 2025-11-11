<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JournalContactMethod extends Model
{
    //
    protected $fillable = [
        'id',
        'journal_id',
        'contact_method_id',
        'responded'
    ];


}
