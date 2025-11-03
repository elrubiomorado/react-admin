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
