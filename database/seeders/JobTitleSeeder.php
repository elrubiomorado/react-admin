<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobTitle;
use App\Models\Team;
class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // seeder
        //campos a poblar
        $jobTitles = [
            ['title' => 'Ingeniero Planta Interna Jr', 'team' => 'CTC'],
            ['title' => 'Supervisor de Acceso', 'team' => 'Acceso'],
            ['title' => 'Ingeniero en Desarrollo', 'team' => 'NOC'],
        ];

        //foreach para iterar en el array de filas a crear
        foreach ($jobTitles as $data) {
            //buscamos el primer elemento que coincida con el nombre del team que queremos agregar
            $team = Team::where('name', $data['team'])->first();
            //Si existe creamos con la info
            if ($team) {
                JobTitle::firstOrCreate([
                    'title' => $data['title'],
                    'team_id' => $team->id,
                ]);
            }
        }
    }
}
