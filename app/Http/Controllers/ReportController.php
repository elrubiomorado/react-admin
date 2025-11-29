<?php

namespace App\Http\Controllers;

use App\Models\Cronometro;
use App\Models\Place;
use App\Models\Type;
use App\Models\Priority;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function create()
    {
        return Inertia::render('Reports/CustomReport', [
            'zones' => Place::select('id', 'name')->get(),
            'types' => Type::select('id', 'name')->get(),
            'priorities' => Priority::select('id', 'level')->get(),
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function generate(Request $request)
    {

        Log::info('ENTRÓ A generate()', $request->all());
        // Validar los datos del request
        $validated = $request->validate([
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate',
            'zoneId' => 'nullable|integer|exists:places,id',
            'typeId' => 'nullable|integer|exists:types,id',
            'priorityId' => 'nullable|integer|exists:priorities,id',
            'userId' => 'nullable|integer|exists:users,id',
        ]);

        $query = Cronometro::with(['user', 'place', 'type', 'priority']);

        // Aplicar filtros de fecha
        if ($request->startDate) {
            $query->whereDate('created_at', '>=', $request->startDate);
        }
        
        if ($request->endDate) {
            $query->whereDate('created_at', '<=', $request->endDate);
        }

        // Aplicar filtros adicionales
        if ($request->zoneId) {
            $query->where('place_id', $request->zoneId);
        }

        if ($request->typeId) {
            $query->where('type_id', $request->typeId);
        }

        if ($request->priorityId) {
            $query->where('priority_id', $request->priorityId);
        }

        if ($request->userId) {
            $query->where('user_id', $request->userId);
        }

        $tickets = $query->get();

        // Calcular métricas del reporte
        $reportData = [
            'totalTickets' => $tickets->count(),
            'activeTickets' => $tickets->where('is_active', true)->count(),
            'resolvedTickets' => $tickets->where('is_active', false)->count(),
            'averageResolutionTime' => $this->calculateAverageTime($tickets->where('is_active', false)),
            'ticketsByPriority' => $this->groupByPriority($tickets),
            'ticketsByZone' => $this->groupByZone($tickets),
            'ticketsByType' => $this->groupByType($tickets),
            'detailedData' => $tickets->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'title' => $ticket->title,
                    'ticket' => $ticket->ticket,
                    'status' => $ticket->is_active ? 'Activo' : 'Resuelto',
                    'zone' => $ticket->place->name,
                    'type' => $ticket->type->name,
                    'priority' => $ticket->priority->level,
                    'user' => $ticket->user->name,
                    'created_at' => Carbon::parse($ticket->created_at)->format('Y-m-d H:i'),
                    'completed_at' => $ticket->completed_at
                         ? Carbon::parse($ticket->completed_at)->format('Y-m-d H:i')
                         : null,
                    'resolution_time' => $ticket->completed_at ? 
                        Carbon::parse($ticket->start)->diffInHours($ticket->completed_at) . ' horas' : 'N/A'
                ];
            })
        ];

        return response()->json($reportData);
    }

    public function export(Request $request)
    {
        $query = Cronometro::with(['user', 'place', 'type', 'priority']);

        // Aplicar filtros de fecha
        if ($request->startDate) {
            $query->whereDate('created_at', '>=', $request->startDate);
        }
        
        if ($request->endDate) {
            $query->whereDate('created_at', '<=', $request->endDate);
        }

        // Aplicar filtros adicionales
        if ($request->zoneId) {
            $query->where('place_id', $request->zoneId);
        }

        if ($request->typeId) {
            $query->where('type_id', $request->typeId);
        }

        if ($request->priorityId) {
            $query->where('priority_id', $request->priorityId);
        }

        if ($request->userId) {
            $query->where('user_id', $request->userId);
        }

        $tickets = $query->get();

        $filename = 'reporte-personalizado-' . now()->format('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($tickets) {
            $file = fopen('php://output', 'w');
            fwrite($file, "\xEF\xBB\xBF");
            
            // Headers
            fputcsv($file, [
                'ID', 'Título', 'Ticket', 'Estado', 'Zona', 'Tipo', 
                'Prioridad', 'Usuario', 'Fecha Creación', 'Fecha Término', 'Tiempo Resolución'
            ], ';');

            // Data
            foreach ($tickets as $ticket) {
                fputcsv($file, [
                    $ticket->id,
                    $ticket->title,
                    $ticket->ticket,
                    $ticket->is_active ? 'Activo' : 'Resuelto',
                    $ticket->place->name,
                    $ticket->type->name,
                    $ticket->priority->level,
                    $ticket->user->name,
                    $ticket->created_at->format('Y-m-d H:i'),
                    $ticket->completed_at?->format('Y-m-d H:i'),
                    $ticket->completed_at ? 
                        Carbon::parse($ticket->start)->diffInHours($ticket->completed_at) . ' horas' : 'N/A'
                ], ';');
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function calculateAverageTime($tickets)
    {
        if ($tickets->isEmpty()) return 0;

        $totalHours = $tickets->sum(function ($ticket) {
            return Carbon::parse($ticket->start)->diffInHours($ticket->completed_at);
        });

        return round($totalHours / $tickets->count(), 1);
    }

    private function groupByPriority($tickets)
    {
        return $tickets->groupBy('priority.level')->map->count();
    }

    private function groupByZone($tickets)
    {
        return $tickets->groupBy('place.name')->map->count();
    }

    private function groupByType($tickets)
    {
        return $tickets->groupBy('type.name')->map->count();
    }
}