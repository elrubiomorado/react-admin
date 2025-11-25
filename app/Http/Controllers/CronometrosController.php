<?php

namespace App\Http\Controllers;

use App\Models\ContactMethod;
use App\Models\Cronometro;
use App\Models\Engineer;
use App\Models\Place;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Exports\CronometrosHistoryExport;
use Maatwebsite\Excel\Facades\Excel;

class CronometrosController extends Controller
{
    public function index()
    {
        // Obtener cronómetros ordenados
        $cronometros = Cronometro::with([
            'user:id,name',
            'place:id,name,state_id',
            'place.state:id,name,zone_id',
            'place.state.zone:id,name',
            'journals:id,cronometro_id,engineer_id,notified_at,note,escalation_stage_id',
            'journals.journalContactMethods:id,responded,journal_id,contact_method_id',

        ])
            ->active()
            ->orderBy('created_at', 'desc')
            ->get();

        // Obtener prioridades y tipos
        $types = Type::with('priorities')->get();
        $places = Place::with(['state.zone'])->get();
        $contactMethods = ContactMethod::all();
        $engineers = Engineer::with([
            'place:id,name,short_name',
            'jobTitle:id,title,team_id',
            'jobTitle.team:id,name',
            'phones:id,engineer_id,phone',
        ])->get();
        return Inertia::render('Cronometros/Index', [
            'cronometros' => $cronometros,
            'places' => $places,
            'types' => $types,
            'engineers' => $engineers,
            'contactMethods' => $contactMethods
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:50|unique:cronometros,title',
            'ticket' => 'required|integer|unique:cronometros,ticket',
            'priority_id' => 'required|integer|exists:priorities,id',
            'type_id' => 'required|integer|exists:types,id',
            'place_id' => 'required|integer|exists:places,id',
        ]);

        Cronometro::create([
            'title' => $request->title,
            'ticket' => $request->ticket,
            'start' => now(),
            'priority_id' => $request->priority_id,
            'type_id' => $request->type_id,
            'status_id' => 1,
            'place_id' => $request->place_id,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Cronómetro creado correctamente.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status_id' => 'required|integer|exists:statuses,id',
        ]);

        $cronometro = Cronometro::findOrFail($id);
        $cronometro->status_id = $request->status_id;
        $cronometro->save();

        return back()->with('success', 'Estado actualizado');
    }

    public function complete($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        $cronometro->markAsCompleted(); // ← Usar el método del modelo
        return redirect()->back()->with('success', 'Cronómetro marcado como terminado.');
    }

    public function destroy($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        $cronometro->delete();

        return redirect()->back()->with('success', 'Cronómetro eliminado.');
    }

    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'status_id' => 'required|integer|exists:statuses,id',
        ]);
        $cronometro = Cronometro::findOrFail($id);
        $cronometro->status_id = $request->status_id;
        $cronometro->save();

        return back()->with('success', 'Estado actualizado');
    }

    public function history()
    {
        $cronometros = Cronometro::with([
            'user:id,name',
            'place:id,name,state_id',
            'place.state:id,name,zone_id',
            'place.state.zone:id,name',
            'journals:id,cronometro_id,engineer_id,notified_at,note,escalation_stage_id',
            'journals.journalContactMethods:id,responded,journal_id,contact_method_id',
        ])
            ->where('status_id', 5)  // Solo cronómetros terminados
            ->whereNotNull('end')
            ->orderBy('end', 'desc')
            ->get();

        return Inertia::render('Cronometros/History', [
            'cronometros' => $cronometros
        ]);
    }

    public function exportHistory()
    {
        $cronometros = Cronometro::with(['user', 'place', 'place.state', 'place.state.zone', 'type', 'priority'])
            ->where('status_id', 5)
            ->whereNotNull('end')
            ->orderBy('end', 'desc')
            ->get();

        $filename = 'cronometros-historial-' . now()->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($cronometros) {
            $file = fopen('php://output', 'w');

            // Agregar BOM para Excel con acentos
            fwrite($file, "\xEF\xBB\xBF");

            // Headers
            fputcsv($file, [
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
            ], ';');

            // Data
            foreach ($cronometros as $cron) {
                $start = \Carbon\Carbon::parse($cron->start);
                $end = $cron->end ? \Carbon\Carbon::parse($cron->end) : now();
                $duration = $start->diffInDays($end);

                fputcsv($file, [
                    $cron->id,
                    $cron->title,
                    $cron->ticket,
                    $cron->place->name ?? 'N/A',
                    $cron->place->state->name ?? 'N/A',
                    $cron->place->state->zone->name ?? 'N/A',
                    $cron->type->name ?? 'N/A',
                    $cron->priority->name ?? 'N/A',
                    $cron->user->name ?? 'N/A',
                    $cron->start,
                    $cron->end ?? 'N/A',
                    $duration
                ], ';');
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
