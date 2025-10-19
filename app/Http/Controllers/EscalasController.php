<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EscalasController extends Controller
{
    public function index(){
        return Inertia::render('Escalas/index');
    }
}
