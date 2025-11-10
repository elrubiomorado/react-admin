<?php

namespace App\Http\Controllers;

use App\Models\Cronometro;
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
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        // Obtener prioridades y tipos
        $types = Type::with('priorities')->get();
        $places = Place::with(['state.zone'])->get();

        return Inertia::render('Cronometros/Index', [
            'cronometros' => $cronometros,
            'places' => $places,
            'types' => $types,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:30|unique:cronometros,title',
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

    public function destroy($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        $cronometro->delete();

        return redirect()->back()->with('success', 'Cronómetro eliminado.');
    }
}
