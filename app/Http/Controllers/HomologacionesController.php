<?php

namespace App\Http\Controllers;

use App\Models\Homologacion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomologacionesController extends Controller
{
    public function index()
    {
        $homologaciones = Homologacion::orderBy('created_at', 'desc')->get();

        return Inertia::render('Homologaciones/Index', [
            'homologaciones' => $homologaciones
        ]);
    }

    public function create()
    {
        return Inertia::render('Homologaciones/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title_base' => 'required|string',
            'body' => 'required|string',
        ]);

        Homologacion::create($request->all());

        return redirect()->route('homologaciones.index')
                         ->with('success', 'Homologación creada correctamente.');
    }

    public function edit($id)
    {
        $homologacion = Homologacion::findOrFail($id);

        return Inertia::render('Homologaciones/Edit', [
            'homologacion' => $homologacion,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title_base' => 'required|string',
            'body' => 'required|string',
        ]);

        $homologacion = Homologacion::findOrFail($id);
        $homologacion->update($request->all());

        return redirect()->route('homologaciones.index')
                         ->with('success', 'Homologación actualizada correctamente.');
    }

    public function destroy($id)
    {
        $homologacion = Homologacion::findOrFail($id);
        $homologacion->delete();
        
        return redirect()->route('homologaciones.index')
                         ->with('success', 'Homologación eliminada correctamente.');
    }
}