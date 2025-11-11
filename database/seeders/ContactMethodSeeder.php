<?php

namespace Database\Seeders;

use App\Models\ContactMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ['WHATSAPP', 'LLAMADA', 'TEAMS'];

        foreach ($names as $name) {
            ContactMethod::firstOrCreate(['name' => $name]);
        }
    }
}
