<?php

use App\Http\Controllers\CronometrosController;
use App\Http\Controllers\EscalasController;
use App\Http\Controllers\HomologacionesController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\UtilitiesController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\EngineerController;
use App\Http\Controllers\JournalController;
use App\Models\Cronometro;
use App\Models\Journal;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $cronometrosActivos = Cronometro::all();

        return Inertia::render('dashboard', compact('cronometrosActivos'));
    })->name('dashboard');
    Route::get('/escalas', [EscalasController::class, 'index'])->name('escalas.index');

    // homologaciones
    Route::get('/homologaciones', [HomologacionesController::class, 'index'])->name('homologaciones.index');
    Route::get('/homologaciones/create', [HomologacionesController::class, 'create'])->name('homologaciones.create');
    Route::post('/homologaciones', [HomologacionesController::class, 'store'])->name('homologaciones.store');
    Route::get('/homologaciones/{id}/edit', [HomologacionesController::class, 'edit'])->name('homologaciones.edit');
    Route::put('/homologaciones/{id}', [HomologacionesController::class, 'update'])->name('homologaciones.update');
    Route::delete('/homologaciones/{id}', [HomologacionesController::class, 'destroy'])->name('homologaciones.destroy');

    // cronometros
    Route::get('/cronometros', [CronometrosController::class, 'index'])->name('cronometros.index');
    Route::get('/cronometros/create', [CronometrosController::class, 'create'])->name('cronometros.create');
    Route::post('/cronometros', [CronometrosController::class, 'store'])->name('cronometros.store');
    Route::delete('/cronometros/{id}', [CronometrosController::class, 'destroy'])->name('cronometros.destroy');
    Route::patch('/cronometros/{id}', [CronometrosController::class, 'update'])->name('cronometros.destroy');
    Route::post('/cronometros/{id}/status', [CronometrosController::class, 'updateStatus'])->name('cronometros.updateStatus');
    Route::post('/cronometros/{id}/complete', [CronometrosController::class, 'complete']);

    // Journal
    Route::get('journals', [JournalController::class, 'index'])->name('utilities.journals.index');
    Route::get('journals/create', [JournalController::class, 'create'])->name('utilities.journals.create');
    Route::post('journals', [JournalController::class, 'store'])->name('utilities.journals.store');
    Route::delete('journals/{id}', [JournalController::class, 'destroy'])->name('utilities.journals.destroy');
    Route::get('journals/{id}/edit', [JournalController::class, 'edit'])->name('utilities.journals.edit');
    Route::put('journals/{id}', [JournalController::class, 'update'])->name('utilities.journals.update');

    //Utilities
    Route::get('/utilities', [UtilitiesController::class, 'index'])->name('utilities.index');

    // places
    Route::get('/utilities/places', [PlaceController::class, 'index'])->name('utilities.places.index');
    Route::get('/utilities/places/create', [PlaceController::class, 'create'])->name('utilities.places.create');
    Route::post('utilities/places', [PlaceController::class, 'store'])->name('utilities.places.store');
    Route::delete('/utilities/places/{id}', [PlaceController::class, 'destroy'])->name('utilities.places.destroy');
    Route::get('/utilities/places/{id}/edit', [PlaceController::class, 'edit'])->name('utilities.places.edit');
    Route::put('/utilities/places/{id}', [PlaceController::class, 'update'])->name('utilities.places.update');


    //teams
    Route::get('/utilities/teams', [TeamController::class, 'index'])->name('utilities.teams.index');
    Route::get('/utilities/teams/create', [TeamController::class, 'create'])->name('utilities.teams.create');
    Route::post('utilities/teams', [TeamController::class, 'store'])->name('utilities.teams.store');
    Route::delete('/utilities/teams/{id}', [TeamController::class, 'destroy'])->name('utilities.teams.destroy');
    Route::get('/utilities/teams/{id}/edit', [TeamController::class, 'edit'])->name('utilities.teams.edit');
    Route::put('/utilities/teams/{id}', [TeamController::class, 'update'])->name('utilities.teams.update');


    // History:
    Route::get('/cronometros/history', [CronometrosController::class, 'history']);
    Route::post('/cronometros/export-history', [CronometrosController::class, 'exportHistory']);

    //Inges
    Route::get('/engineers', [EngineerController::class, 'index'])->name('engineers.index');
    Route::get('/engineers/create', [EngineerController::class, 'create'])->name('engineers.create');
    Route::post('/engineers', [EngineerController::class, 'store'])->name('engineers.store');
    Route::get('/engineers/{id}/edit', [EngineerController::class, 'edit'])->name('engineers.edit');
    Route::put('/engineers/{id}', [EngineerController::class, 'update'])->name('engineers.update');
    Route::delete('/engineers/{id}', [EngineerController::class, 'destroy'])->name('engineers.destroy');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
