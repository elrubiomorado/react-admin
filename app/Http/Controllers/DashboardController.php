<?php

namespace App\Http\Controllers;

use App\Models\Cronometro;
use App\Models\Place;
use App\Models\Priority;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

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

        return Inertia::render('Dashboard/MetricsDashboard', [
            'metrics' => $metrics
        ]);
    }

    private function getActiveTickets()
    {
        return Cronometro::where('is_active', true)->count();
    }

    private function getCreatedToday()
    {
        return Cronometro::whereDate('created_at', today())->count();
    }

    private function getResolvedToday()
    {
        return Cronometro::where('is_active', false)
            ->whereDate('completed_at', today())
            ->count();
    }

    private function calculateAverageResolutionTime()
    {
        $resolvedTickets = Cronometro::where('is_active', false)
            ->whereNotNull('completed_at')
            ->get();

        if ($resolvedTickets->isEmpty()) {
            return 0;
        }

        $totalHours = $resolvedTickets->sum(function ($ticket) {
            $start = Carbon::parse($ticket->start);
            $end = Carbon::parse($ticket->completed_at);
            return $start->diffInHours($end);
        });

        return round($totalHours / $resolvedTickets->count(), 1);
    }

    private function calculateTicketTrend()
    {
        $todayCount = Cronometro::whereDate('created_at', today())->count();
        $yesterdayCount = Cronometro::whereDate('created_at', today()->subDay())->count();

        if ($yesterdayCount === 0) {
            return 0;
        }

        return round((($todayCount - $yesterdayCount) / $yesterdayCount) * 100, 1);
    }

    private function calculateTimeTrend()
    {
        // Comparar tiempo promedio de esta semana vs semana anterior
        $currentWeekAvg = $this->getWeeklyAverageTime(0); // Semana actual
        $lastWeekAvg = $this->getWeeklyAverageTime(1); // Semana anterior

        if ($lastWeekAvg === 0) {
            return 0;
        }

        return round((($currentWeekAvg - $lastWeekAvg) / $lastWeekAvg) * 100, 1);
    }

    private function getWeeklyAverageTime($weeksAgo = 0)
    {
        $startDate = now()->subWeeks($weeksAgo)->startOfWeek();
        $endDate = now()->subWeeks($weeksAgo)->endOfWeek();

        $tickets = Cronometro::where('is_active', false)
            ->whereNotNull('completed_at')
            ->whereBetween('completed_at', [$startDate, $endDate])
            ->get();

        if ($tickets->isEmpty()) {
            return 0;
        }

        $totalHours = $tickets->sum(function ($ticket) {
            $start = Carbon::parse($ticket->start);
            $end = Carbon::parse($ticket->completed_at);
            return $start->diffInHours($end);
        });

        return round($totalHours / $tickets->count(), 1);
    }

    private function getTicketsByUser($limit = 10)
    {
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();

        // Método alternativo que funciona sin la relación en el modelo User
        $usersWithTickets = Cronometro::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->selectRaw('user_id, COUNT(*) as tickets_count')
            ->with('user:id,name') // Cargar relación user desde Cronometro
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
        return Place::withCount([
            'cronometros as active_tickets' => function ($query) {
                $query->where('is_active', true);
            }
        ])
        ->orderByDesc('active_tickets')
        ->limit($limit)
        ->get()
        ->map(function ($place) {
            return [
                'nombre' => $place->name,
                'tickets' => $place->active_tickets,
                'tendencia' => rand(-15, 15) // Por ahora aleatorio, luego podemos calcular tendencia real
            ];
        })
        ->toArray();
    }
}