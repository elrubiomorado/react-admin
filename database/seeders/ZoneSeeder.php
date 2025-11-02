<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Zone;
use Database\Seeders\ZoneSeeder;
class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Creamos las 5 zonas que componen los lugares de mega
        $zones = [
            'Occidente',
            'Norte',
            'Bajio-Golfo',
            'Centro',
            'Sur'
        ];

        foreach ($zones as $name) {
            Zone::firstOrCreate(
                ['name' => $name], // busca por nombre
                [] // no hay más campos, pero puedes agregar defaults aquí si después los hay
            );
        }
    }
}
