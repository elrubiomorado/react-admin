<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cronometro extends Model
{
    protected $fillable = [
        'title',
        'ticket',
        'start',
        'end',
        'priority_id',
        'type_id',
        'status_id',
        'user_id',
        'place_id',
        'is_active',
        'completed_at'
    ];

    //  métodos
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_active', false);
    }

    public function markAsCompleted()
    {
        $this->update([
            'is_active' => false,
            'completed_at' => now()
        ]);
    }

    // Relaciones
    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function journals()
    {
        return $this->hasMany(Journal::class);
    }
}
