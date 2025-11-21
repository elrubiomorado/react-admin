<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    // Mostrar lista
    public function index()
    {
        $calendars = Calendar::latest()->get();

        return inertia('Utilities/Calendars/Index', [
            'calendars' => $calendars
        ]);
    }

    // Mostrar formulario crear
    public function create()
    {
        return inertia('Utilities/Calendars/Create');
    }

    // Guardar en BD
    public function store(Request $request)
    {
        $validated = $request->validate([
            'note' => 'required|string|max:255',
            'date' => 'nullable|date',
            'user_id' => 'nullable|integer'
        ]);

        Calendar::create($validated);

        return redirect()->route('utilities.calendars.index');
    }

    // Mostrar formulario editar
    public function edit($id)
    {
        $calendar = Calendar::findOrFail($id);

        return inertia('Utilities/Calendars/Edit', [
            'calendar' => $calendar
        ]);
    }

    // Actualizar
    public function update(Request $request, $id)
    {
        $calendar = Calendar::findOrFail($id);

        $validated = $request->validate([
            'note' => 'required|string|max:255',
            'date' => 'nullable|date',
            'user_id' => 'nullable|integer'
        ]);

        $calendar->update($validated);

        return redirect()->route('utilities.calendars.index');
    }

    // Eliminar
    public function destroy($id)
    {
        Calendar::findOrFail($id)->delete();

        return redirect()->route('utilities.calendars.index');
    }
}
