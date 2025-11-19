<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\Cronometro;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cronometro_id' => 'required|integer|exists:cronometros,id',
            'engineer_id' => 'required|integer|exists:engineers,id', // un ingeniero por journal
            'escalation_stage_id' => 'required|integer|exists:escalation_stages,id',
            'note' => 'nullable|string',
            'contact_methods' => 'nullable|array', // array de ids
            'responses' => 'nullable|array', // objecto { methodId: true/false }
            'responses.*' => 'boolean',
        ]);

        $journal = Journal::create([
            'cronometro_id' => $request->cronometro_id,
            'engineer_id' => $request->engineer_id,
            'escalation_stage_id' => $request->escalation_stage_id,
            'note' => $request->note,
            'notified_at' => now(),
        ]);

        // Guardar métodos de contacto con su respuesta individual
        if ($request->contact_methods) {
            foreach ($request->contact_methods as $methodId) {
                $journal->journalContactMethods()->create([
                    'contact_method_id' => $methodId,
                    'responded' => $request->responses[$methodId] ?? false,
                ]);
            }
        }

        $cronometro = Cronometro::findOrFail($request->cronometro_id);
        // Solo regresar a "En progreso" si no está quemado
        if ($cronometro->status_id !== 4) {
            $cronometro->status_id = 1;
            $cronometro->save();
        }

        return redirect()->back()->with('success', 'Escalación creada correctamente.');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
