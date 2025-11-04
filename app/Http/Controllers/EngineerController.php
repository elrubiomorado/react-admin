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
                        ->orWhereHas('team', fn ($t) => $t->where('name', 'like', "%{$search}%")
                        )
                    )
                    ->orWhereHas('place', fn ($p) => $p->where('name', 'like', "%{$search}%")
                        ->orWhere('short_name', 'like', "%{$search}%")
                    )
                    ->orWhereHas('phones', fn ($ph) => $ph->where('phone', 'like', "%{$search}%")
                    );
            })
            )
            ->orderBy('name')
            ->get();

        return inertia('Engineers/Index', compact('engineers', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        // regresar job_titles_places

        $job_titles = JobTitle::all();
        $places = Place::all();

        return Inertia::render('Engineers/Create', compact('job_titles', 'places'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ✅ Validaciones
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:engineers,name',
            'engineer_phones' => 'required|array|min:1',
            'engineer_phones.*' => 'required|string|max:10|unique:engineer_phones,phone',
            'email' => 'nullable|email|max:60|unique:engineers,email',
            'teams_user' => 'nullable|string|max:255|unique:engineers,teams_user',
            'job_title_id' => 'nullable|integer|exists:job_titles,id',
            'place_id' => 'nullable|integer|exists:places,id',
        ]);

        // ✅ Crear ingeniero con los campos validados
        $engineer = Engineer::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'teams_user' => $validated['teams_user'] ?? null,
            'job_title_id' => $validated['job_title_id'] ?? null,
            'place_id' => $validated['place_id'] ?? null,
        ]);

        // ✅ Guardar teléfonos asociados (si hay)
        if (! empty($validated['engineer_phones'])) {
            foreach ($validated['engineer_phones'] as $phone) {
                $engineer->phones()->create([
                    'phone' => (string) $phone, // forzamos a string
                ]);
            }
        }

        return redirect()
            ->route('engineers.index')
            ->with('success', 'Ingeniero añadido exitosamente');
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
