<?php

namespace App\Http\Controllers;

use App\Models\ContactMethod;
use App\Models\Cronometro;
use App\Models\Engineer;
use App\Models\Place;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'user_id' => auth()->id(),
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

    public function updateStatus($id, Request $request){
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
        ->completed() // ← Usar scope para completados
        ->orderBy('completed_at', 'desc')
        ->get();

        return Inertia::render('Cronometros/History', [
            'cronometros' => $cronometros
        ]);
    }
}

