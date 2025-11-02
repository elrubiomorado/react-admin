<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobTitle;
use App\Models\Place;
use App\Models\Engineer;

class EngineerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $engineers = [
            ['name' => 'Edgar Avila Gonzalez', 'teams_user' => 'edavilago', 'email' => 'edavilago@megacable.com.mx','job_title_title' => 'Ingeniero en Desarrollo', 'place_name' => 'Guadalajara'],
            ['name' => 'Nataly Lopez Figeroa', 'job_title_title' => 'Ingeniero en Desarrollo', 'teams_user' => 'nalopezfi', 'place_name' => 'Guadalajara', 'email' => 'nalopezfi@megacable.com.mx'],
            ['name' => 'Manuel De Jesus Toledo Avando', 'job_title_title' => 'Ingeniero en Desarrollo', 'teams_user' => 'mtoledoa', 'place_name' => 'Guadalajara', 'email' => 'mtoledoa@megacable.com.mx'],
        ];

        //itera la lista de elementos a crear
        foreach ($engineers as $engineer){
            $job_title = JobTitle::where('title', $engineer['job_title_title'])->first();
            $place = Place::where('name', $engineer['place_name'])->first();
            if($job_title and $place){
                Engineer::firstOrCreate([
                    'name' => $engineer['name'],
                    'teams_user' => $engineer['teams_user'],
                    'email' => $engineer['email'],
                    'job_title_id' => $job_title->id,
                    'place_id' => $place->id
                ]);
            }
        }
    }
}
