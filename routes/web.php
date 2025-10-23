<?php

use App\Http\Controllers\CronometrosController;
use App\Http\Controllers\EscalasController;
use App\Http\Controllers\HomologacionesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/escalas', [EscalasController::class, 'index'])->name('escalas.index');

    Route::get('/homologaciones', [HomologacionesController::class, 'index'])->name('homologaciones.index');
    Route::get('/homologaciones/create', [HomologacionesController::class, 'create'])->name('homologaciones.create');
    Route::post('/homologaciones', [HomologacionesController::class, 'store'])->name('homologaciones.store');
    Route::get('/homologaciones/{id}/edit', [HomologacionesController::class, 'edit'])->name('homologaciones.edit');
    Route::put('/homologaciones/{id}', [HomologacionesController::class, 'update'])->name('homologaciones.update');
    Route::delete('/homologaciones/{id}', [HomologacionesController::class, 'destroy'])->name('homologaciones.destroy');
    Route::get('/cronometros', [CronometrosController::class, 'index'])->name('cronometros.index');
    Route::post('/cronometros', [CronometrosController::class, 'store'])->name('cronometros.store');
    Route::put('/cronometros/{id}/iniciar', [CronometrosController::class, 'iniciar'])->name('cronometros.iniciar');
    Route::put('/cronometros/{id}/pausar', [CronometrosController::class, 'pausar'])->name('cronometros.pausar');
    Route::put('/cronometros/{id}/detener', [CronometrosController::class, 'detener'])->name('cronometros.detener');
    Route::delete('/cronometros/{id}', [CronometrosController::class, 'destroy'])->name('cronometros.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
