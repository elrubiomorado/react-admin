<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\JobTitle;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EngineerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $engineers = Engineer::with([
            'place:id,name,short_name',
            'jobTitle:id,title,team_id',
            'jobTitle.team:id,name',
            'phones:id,engineer_id,phone',
        ])
            ->when($search, fn ($query) => $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('teams_user', 'like', "%{$search}%")
                    ->orWhereHas('jobTitle', fn ($jt) => $jt->where('title', 'like', "%{$search}%")
                        ->orWhereHas('team', fn ($t) => $t->where('name', 'like', "%{$search}%"))
                    )
                    ->orWhereHas('place', fn ($p) => $p->where('name', 'like', "%{$search}%")
                        ->orWhere('short_name', 'like', "%{$search}%")
                    )
                    ->orWhereHas('phones', fn ($ph) => $ph->where('phone', 'like', "%{$search}%"));
            }))
            ->orderBy('name')
            ->get();

        return Inertia::render('Engineers/Index', compact('engineers', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $job_titles = JobTitle::all();
        $places = Place::all();

        return Inertia::render('Engineers/Create', compact('job_titles', 'places'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:engineers,name',
            'engineer_phones' => 'required|array|min:1',
            'engineer_phones.*' => 'required|string|max:10|unique:engineer_phones,phone',
            'email' => 'nullable|email|max:60|unique:engineers,email',
            'teams_user' => 'nullable|string|max:255|unique:engineers,teams_user',
            'job_title_id' => 'nullable|integer|exists:job_titles,id',
            'place_id' => 'nullable|integer|exists:places,id',
        ]);

        $engineer = Engineer::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'teams_user' => $validated['teams_user'] ?? null,
            'job_title_id' => $validated['job_title_id'] ?? null,
            'place_id' => $validated['place_id'] ?? null,
        ]);

        if (! empty($validated['engineer_phones'])) {
            foreach ($validated['engineer_phones'] as $phone) {
                $engineer->phones()->create([
                    'phone' => (string) $phone,
                ]);
            }
        }

        return redirect()
            ->route('engineers.index')
            ->with('success', 'Ingeniero añadido exitosamente');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
{
    $engineer = Engineer::with(['phones'])->findOrFail($id);
    $job_titles = JobTitle::all();
    $places = Place::all();

    return Inertia::render('Engineers/EditEngineer', compact('engineer', 'job_titles', 'places'));
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $engineer = Engineer::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:engineers,name,' . $engineer->id,
            'engineer_phones' => 'nullable|array',
            'engineer_phones.*' => 'required|string|max:10|unique:engineer_phones,phone,' . $engineer->id . ',engineer_id',
            'email' => 'nullable|email|max:60|unique:engineers,email,' . $engineer->id,
            'teams_user' => 'nullable|string|max:255|unique:engineers,teams_user,' . $engineer->id,
            'job_title_id' => 'nullable|integer|exists:job_titles,id',
            'place_id' => 'nullable|integer|exists:places,id',
        ]);

        $engineer->update([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'teams_user' => $validated['teams_user'] ?? null,
            'job_title_id' => $validated['job_title_id'] ?? null,
            'place_id' => $validated['place_id'] ?? null,
        ]);

        // Actualizar teléfonos
        $engineer->phones()->delete(); // borramos los antiguos
        if (! empty($validated['engineer_phones'])) {
            foreach ($validated['engineer_phones'] as $phone) {
                $engineer->phones()->create([
                    'phone' => (string) $phone,
                ]);
            }
        }

        return redirect()
            ->route('engineers.index')
            ->with('success', 'Ingeniero actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $engineer = Engineer::findOrFail($id);
        $engineer->delete();

        return redirect()->route('engineers.index')
                         ->with('success', 'Ingeniero eliminado correctamente.');
    }
}