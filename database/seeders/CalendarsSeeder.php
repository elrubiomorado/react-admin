<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CalendarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('calendars')->insert([

            [
                'note'=> 'Inicio de mis turnos, dia 1',
                'date'=> '2025-02-01',
                'user_id'=>1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'note'=> 'Turno nocturno de ejemplo',
                'date'=> '2025-02-02',
                'user_id'=>2,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],

        ]);
    }
}
