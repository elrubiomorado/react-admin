<?php

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
