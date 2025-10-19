<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homologacion extends Model
{
    use HasFactory;

    // Indicar explícitamente la tabla
    protected $table = 'homologaciones';

    protected $fillable = ['name', 'title_base', 'body'];
}
