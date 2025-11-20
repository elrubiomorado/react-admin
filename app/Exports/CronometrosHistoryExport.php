<?php

namespace App\Exports;

use App\Models\Cronometro;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class CronometrosHistoryExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return Collection
     */
    public function collection()
    {
        return Cronometro::with(['user', 'place', 'place.state', 'place.state.zone', 'type', 'priority'])
            ->where('is_active', false)
            ->whereNotNull('completed_at')
            ->orderBy('completed_at', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Título',
            'Ticket',
            'Lugar',
            'Estado',
            'Zona',
            'Tipo',
            'Prioridad',
            'Usuario',
            'Fecha Inicio',
            'Fecha Término',
            'Duración (días)'
        ];
    }

    /**
     * @param Cronometro $cronometro
     * @return array
     */
    public function map($cronometro): array
    {
        $start = Carbon::parse($cronometro->start);
        $end = $cronometro->completed_at ? Carbon::parse($cronometro->completed_at) : now();
        $duration = $start->diffInDays($end);

        return [
            $cronometro->id,
            $cronometro->title,
            $cronometro->ticket,
            $cronometro->place->name ?? 'N/A',
            $cronometro->place->state->name ?? 'N/A',
            $cronometro->place->state->zone->name ?? 'N/A',
            $cronometro->type->name ?? 'N/A',
            $cronometro->priority->name ?? 'N/A',
            $cronometro->user->name ?? 'N/A',
            $cronometro->start,
            $cronometro->completed_at ?? 'N/A',
            $duration
        ];
    }
}