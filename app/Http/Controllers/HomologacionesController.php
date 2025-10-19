<?php

namespace App\Http\Controllers;

use App\Models\Homologacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
class HomologacionesController extends Controller
{
    public function index(){
        // Traer todas las homologaciones
        $homologaciones = Homologacion::orderBy('created_at', 'desc')->get();

        // Pasarlas a Inertia como 'homologaciones'
        return inertia::render('Homologaciones/index', [
            'homologaciones' => $homologaciones
        ]);
    }
    public function create(){
        return inertia::render('Homologaciones/create');
    }
    // Guardar plantilla
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
}
