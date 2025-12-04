<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $teams = ['CTC', 'Acceso', 'Core', 'NOC', 'Infraestructura', 'RNOC', 'MCA', 'Gerencia', 'Ingenieria', 'Redes',
         'Servicios Tecnicos', 'Planta Interna', 'Planta Externa', 'Analisis', 'Mantenimiento', 'Sistema', 'Operaciones', 'Corporativo',
         'Administrativo', ];

        foreach ($teams as $name) {
            Team::firstOrCreate(['name' => $name]);
        }
    }
}
