<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Models\CalendarDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarController extends Controller
{
    // ------------------------------
    // LISTA DE CALENDARIOS
    // ------------------------------
   public function index()
    {
        $days = CalendarDay::where('user_id', Auth::id())
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('Utilities/Calendars/Index', [
            'calendars' => $days
        ]);
    }

    // ------------------------------
    // FORMULARIO CREATE
    // ------------------------------
    public function create()
    {
        return inertia('Utilities/Calendars/Create');
    }

    // ------------------------------
    // GUARDAR CALENDARIO Y SUS DÍAS
    // ------------------------------
    public function store(Request $request)
{
    $request->validate([
        'start_date' => 'required|date',
        'shift_pattern' => 'required|string',
        'note' => 'nullable|string',
        'days' => 'required|array',
        'days.*.date' => 'required|date',
        'days.*.shift_type' => 'required|string',
        'days.*.color' => 'required|string',
        'days.*.note' => 'nullable|string',
    ]);

    // 1️⃣ Crear calendario principal
    $calendar = Calendar::create([
        'user_id'       => Auth::id(),
        'start_date'    => $request->start_date,
        'shift_pattern' => $request->shift_pattern,
        'note'          => $request->note,
    ]);

    // 2️⃣ Insertar días
    $rows = [];

    foreach ($request->days as $day) {
        $rows[] = [
            'calendar_id' => $calendar->id,
            'user_id'     => Auth::id(),
            'date'        => $day['date'],
            'shift_type'  => $day['shift_type'],
            'color'       => $day['color'],
            'note'        => $day['note'] ?? null,
            'created_at'  => now(),
            'updated_at'  => now(),
        ];
    }

    CalendarDay::insert($rows);

    return redirect()
        ->route('utilities.calendars.index')
        ->with('success', '¡Calendario generado correctamente!');
}

    // ------------------------------
    // ELIMINAR CALENDARIO COMPLETO
    // ------------------------------
    public function destroy($id)
    {
        $calendar = Calendar::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        CalendarDay::where('calendar_id', $calendar->id)->delete();
        $calendar->delete();

        return redirect()->route('utilities.calendars.index');
    }

}

