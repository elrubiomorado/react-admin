<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Zone;
use App\Models\State;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $places = [
            ['name' => 'JALISCO', 'zone' => 'OCCIDENTE'],
            ['name' => 'MONTERREY', 'zone' => 'NORTE'],
            ['name' => 'CIUDAD DE MEXICO', 'zone' => 'CENTRO'],
            ['name' => 'AGUASCALIENTES', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'BAJA CALIFORNIA', 'zone' => 'NORTE'],
            ['name' => 'CAMPECHE', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'CHIAPAS', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'CHIHUAHUA', 'zone' => 'NORTE'],
            ['name' => 'COAHUILA', 'zone' => 'NORTE'],
            ['name' => 'COLIMA', 'zone' => 'OCCIDENTE'],
            ['name' => 'DURANGO', 'zone' => 'NORTE'],
            ['name' => 'GUANAJUATO', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'GUERRERO', 'zone' => 'SUR'],
            ['name' => 'HIDALGO', 'zone' => 'CENTRO'],
            ['name' => 'JALISCO', 'zone' => 'OCCIDENTE'],
            ['name' => 'MÉXICO', 'zone' => 'CENTRO'],
            ['name' => 'MICHOACÁN', 'zone' => 'OCCIDENTE'],
            ['name' => 'MORELOS', 'zone' => 'CENTRO'],
            ['name' => 'NAYARIT', 'zone' => 'OCCIDENTE'],
            ['name' => 'NUEVO LEÓN', 'zone' => 'NORTE'],
            ['name' => 'OAXACA', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'PUEBLA', 'zone' => 'CENTRO'],
            ['name' => 'QUERÉTARO', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'QUINTANA ROO', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'SAN LUIS POTOSÍ', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'SINALOA', 'zone' => 'NORTE'],
            ['name' => 'SONORA', 'zone' => 'NORTE'],
            ['name' => 'TABASCO', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'TAMAULIPAS', 'zone' => 'NORTE'],
            ['name' => 'TLAXCALA', 'zone' => 'CENTRO'],
            ['name' => 'VERACRUZ', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'YUCATÁN', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'ZACATECAS', 'zone' => 'BAJIO-GOLFO'],
            ['name' => 'CIUDAD DE MÉXICO', 'zone' => 'CENTRO'],
        ];

        foreach ($places as $data) {
            $zone = Zone::where('name', $data['zone'])->first(); // busca la zona por nombre

            if ($zone) {
                State::firstOrCreate(
                    [
                        'name' => $data['name'],
                        'zone_id' => $zone->id,
                    ]
                );
            }
        }
    }
}
