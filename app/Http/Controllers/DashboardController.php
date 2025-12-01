<?php

namespace App\Http\Controllers;

use App\Models\Cronometro;
use App\Models\Place;
use App\Models\Priority;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function metrics()
    {
        $metrics = [
            // Métricas principales
            'ticketsActivos' => $this->getActiveTickets(),
            'ticketsCreadosHoy' => $this->getCreatedToday(),
            'ticketsResueltosHoy' => $this->getResolvedToday(),
            'tiempoPromedioResolucion' => $this->calculateAverageResolutionTime(),

            // Tendencias
            'tendenciaTickets' => $this->calculateTicketTrend(),
            'tendenciaTiempo' => $this->calculateTimeTrend(),

            // Nuevas métricas
            'ticketsPorUsuario' => $this->getTicketsByUser(),
            'topZonas' => $this->getTopZones(),
        ];

        // Debug temporal
        Log::info('Métricas calculadas:', $metrics);

        return Inertia::render('Dashboard/MetricsDashboard', [
            'metrics' => $metrics
        ]);
    }

    private function getActiveTickets()
    {
        return Cronometro::whereIn('status_id', [1, 2, 3, 4])->count();
    }

    private function getCreatedToday()
    {
        return Cronometro::whereDate('created_at', today())->count();
    }

    private function getResolvedToday()
    {
        // REMOVER filtro user_id = 5
        return Cronometro::whereDate('end', today())->count();
    }

    private function calculateAverageResolutionTime()
    {
        // REMOVER filtro user_id = 5
        $resolvedTickets = Cronometro::whereNotNull('end')->get();

        if ($resolvedTickets->isEmpty()) {
            return 0;
        }

        $totalHours = $resolvedTickets->sum(function ($ticket) {
            $start = Carbon::parse($ticket->start);
            $end = Carbon::parse($ticket->end);
            return $start->diffInHours($end);
        });

        return round($totalHours / $resolvedTickets->count(), 1);
    }

    private function calculateTicketTrend()
    {
        $todayCount = Cronometro::whereDate('start', today())->count();
        $yesterdayCount = Cronometro::whereDate('start', today()->subDay())->count();

        if ($yesterdayCount === 0) {
            return 0;
        }

        return round((($todayCount - $yesterdayCount) / $yesterdayCount) * 100, 1);
    }

    private function calculateTimeTrend()
    {
        $currentWeekAvg = $this->getWeeklyAverageTime(0);
        $lastWeekAvg = $this->getWeeklyAverageTime(1);

        if ($lastWeekAvg === 0) {
            return 0;
        }

        return round((($currentWeekAvg - $lastWeekAvg) / $lastWeekAvg) * 100, 1);
    }

    private function getWeeklyAverageTime($weeksAgo = 0)
    {
        $startDate = now()->subWeeks($weeksAgo)->startOfWeek();
        $endDate = now()->subWeeks($weeksAgo)->endOfWeek();

        // REMOVER filtro user_id = 5
        $tickets = Cronometro::whereNotNull('end')
            ->whereBetween('end', [$startDate, $endDate])
            ->get();

        if ($tickets->isEmpty()) {
            return 0;
        }

        $totalHours = $tickets->sum(function ($ticket) {
            $start = Carbon::parse($ticket->start);
            $end = Carbon::parse($ticket->end);
            return $start->diffInHours($end);
        });

        return round($totalHours / $tickets->count(), 1);
    }

    private function getTicketsByUser($limit = 10)
    {
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();

        $usersWithTickets = Cronometro::whereBetween('start', [$startOfWeek, $endOfWeek])
            ->selectRaw('user_id, COUNT(*) as tickets_count')
            ->with('user:id,name')
            ->groupBy('user_id')
            ->orderByDesc('tickets_count')
            ->limit($limit)
            ->get()
            ->map(function ($cronometro) {
                return [
                    'nombre' => $cronometro->user->name ?? 'Usuario Desconocido',
                    'tickets' => $cronometro->tickets_count,
                    'avatar' => null
                ];
            })
            ->toArray();

        return $usersWithTickets;
    }

    private function getTopZones($limit = 5)
    {
        // REMOVER filtro user_id = 5
        return Place::withCount('cronometros as active_tickets')
            ->orderByDesc('active_tickets')
            ->limit($limit)
            ->get()
            ->map(function ($place) {
                return [
                    'nombre' => $place->name,
                    'tickets' => $place->active_tickets,
                    'tendencia' => rand(-15, 15)
                ];
            })
            ->toArray();
    }
}