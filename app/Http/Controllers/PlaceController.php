<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\State;
use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $zone_id = $request->input('zone_id', '');

        $places = Place::with(['state.zone']) // 👈 ahora trae la zona a través del estado
            ->when($zone_id, fn ($query) => $query->whereHas('state', fn ($s) => $s->where('zone_id', $zone_id))
            )
            ->when($search, fn ($query) => $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('short_name', 'like', "%{$search}%")
                    ->orWhereHas('state', fn ($s) => $s->where('name', 'like', "%{$search}%")
                        ->orWhereHas('zone', fn ($z) => $z->where('name', 'like', "%{$search}%")
                        )
                    );
            }))
            ->orderBy('name')
            ->get();

        // Zonas para el filtro
        $zones = Zone::all();

        return inertia('Utilities/Places/Index', compact('places', 'zones', 'search', 'zone_id'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // regresamos la vista create
        $states = State::all();

        return Inertia::render('Utilities/Places/Create', compact('states'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:places,name',
            'short_name' => 'nullable|string|max:8|unique:places,short_name',
            'state_id' => 'required|integer|exists:states,id',
        ]);

        Place::create($request->all());

        return redirect()->route('utilities.places.index')
            ->with('success', 'Plaza anadida exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    // Muestra el formulario de edición
    public function edit($id)
    {
        $states = State::all();
        $place = Place::findOrFail($id);
        return Inertia::render('Utilities/Places/Edit', [
            'place' => $place,
            'states' => $states,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:places,name,'.$id,
            'short_name' => 'required|string|max:50',
            'state_id' => 'required|integer|exists:states,id',
        ]);

        $place = Place::findOrFail($id);
        $place->update($validated);

        return redirect()
            ->route('utilities.places.index')
            ->with('success', 'Place updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $place = Place::findOrFail($id);
        $place->delete();

        return redirect()->route('utilities.places.index')
            ->with('success', 'Plaza eliminada correctamente.');
    }
}
