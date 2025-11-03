<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Place;
use App\Models\State;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Seeder de prueba de lugares
        // Ejemplo: crear lugares y asignarlos a zonas existentes
        $places = [
            ['name' => 'GUADALAJARA', 'short_name' => 'GDL', 'state' => 'JALISCO'],
            ['name' => 'MONTERREY', 'short_name' => 'MTY','state' => 'MONTERREY'],
            ['name' => 'CDMX', 'short_name' => 'CDMX','state' => 'CIUDAD DE MEXICO'],
        ];

        foreach ($places as $data) {
            $state = State::where('name', $data['state'])->first(); // busca la zona por nombre

            if ($state) {
                Place::firstOrCreate(
                    [
                        'name' => $data['name'],
                        'short_name' => $data['short_name'],
                        'state_id' => $state->id,
                    ]
                );
            }
        }
    }
}
