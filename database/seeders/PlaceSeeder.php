<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Place;
use App\Models\Zone;

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
            ['name' => 'Guadalajara', 'short_name' => 'GDL', 'zone' => 'Occidente'],
            ['name' => 'Monterrey', 'short_name' => 'MTY','zone' => 'Norte'],
            ['name' => 'CDMX', 'short_name' => 'CDMX','zone' => 'Centro'],
        ];

        foreach ($places as $data) {
            $zone = Zone::where('name', $data['zone'])->first(); // busca la zona por nombre

            if ($zone) {
                Place::firstOrCreate(
                    [
                        'name' => $data['name'],
                        'short_name' => $data['short_name'],
                        'zone_id' => $zone->id,
                    ]
                );
            }
        }
    }
}
