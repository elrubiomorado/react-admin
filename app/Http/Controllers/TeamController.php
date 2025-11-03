<?php

namespace App\Http\Controllers;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $teams = Team::all();

        return inertia('Utilities/Teams/Index', compact('teams'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // regresamos la vista create

        // Todo - unidad de negocio
        return Inertia::render('Utilities/Teams/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:teams,name',
        ]);

        Team::create($request->all());

        return redirect()->route('utilities.teams.index')
            ->with('success', 'Team anadida exitosamente');
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
        $team = Team::findOrFail($id);
        return Inertia::render('Utilities/Teams/Edit', [
            'team' => $team,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:teams,name,'.$id,
        ]);

        $team = Team::findOrFail($id);
        $team->update($validated);

        return redirect()
            ->route('utilities.teams.index')
            ->with('success', 'Team updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $place = Team::findOrFail($id);
        $place->delete();

        return redirect()->route('utilities.teams.index')
            ->with('success', 'Team eliminado correctamente.');
    }
}
