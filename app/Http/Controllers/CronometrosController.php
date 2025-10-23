<?php

namespace App\Http\Controllers;

use App\Models\Cronometro;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class CronometrosController extends Controller
{
    public function index()
    {
        $cronometros = Cronometro::with('usuario:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Cronometros/Index', [
            'cronometros' => $cronometros
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255'
        ]);

        Cronometro::create([
            'titulo' => $request->titulo,
            'estado' => 'detenido',
            'creado_por' => auth()->id()
        ]);

        return redirect()->back()->with('success', 'Cronómetro creado correctamente.');
    }

    // ... (los demás métodos permanecen igual)
    public function iniciar($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        
        $cronometro->update([
            'estado' => 'activo',
            'hora_inicio' => $cronometro->hora_inicio ?: now(),
            'hora_final' => null
        ]);

        return redirect()->back()->with('success', 'Cronómetro iniciado.');
    }

    public function pausar($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        
        if ($cronometro->estado === 'activo') {
            $tiempoTranscurrido = now()->diffInMilliseconds($cronometro->hora_inicio);
            $cronometro->update([
                'estado' => 'pausado',
                'tiempo_pausado' => $cronometro->tiempo_pausado + $tiempoTranscurrido
            ]);
        }

        return redirect()->back()->with('success', 'Cronómetro pausado.');
    }

    public function detener($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        
        $cronometro->update([
            'estado' => 'detenido',
            'hora_final' => now()
        ]);

        return redirect()->back()->with('success', 'Cronómetro detenido.');
    }

    public function destroy($id)
    {
        $cronometro = Cronometro::findOrFail($id);
        $cronometro->delete();

        return redirect()->back()->with('success', 'Cronómetro eliminado.');
    }
}