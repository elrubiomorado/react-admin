<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //llamamos los seeders de los modelos
        $this->call([
            ZoneSeeder::class,
            StateSeeder::class,
            PlaceSeeder::class,
            TeamSeeder::class,
            JobTitleSeeder::class,
            StatusSeeder::class,
            EngineerSeeder::class,
            EngineerPhoneSeeder::class,
            PrioritySeeder::class,
            TypeSeeder::class,
            PriorityTypeSeeder::class,
            EscalationStageSeeder::class
        ]);
        User::firstOrCreate(
            ['email' => 'avilaedgar2001@gmail.com'],
            [
                'name' => 'Edgar Avila Gonzalez',
                'password' => '12345678',
                'email_verified_at' => now(),
            ]
        );
        User::firstOrCreate(
            ['email' => 'nanat.nataly@gmail.com'],
            [
                'name' => 'Nataly Lopez Figueroa',
                'password' => 'nanat1234',
                'email_verified_at' => now(),
            ]
        );
    }
}
