<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cronometro extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'hora_inicio',
        'hora_final',
        'tiempo_pausado',
        'estado',
        'creado_por'
    ];

    protected $casts = [
        'hora_inicio' => 'datetime',
        'hora_final' => 'datetime',
        'tiempo_pausado' => 'integer'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'creado_por');
    }
}