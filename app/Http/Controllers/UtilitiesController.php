<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UtilitiesController extends Controller
{
    //
    public function index(){
        return Inertia::render('Utilities/Index');
    }
}
