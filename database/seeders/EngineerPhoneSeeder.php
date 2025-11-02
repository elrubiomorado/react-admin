<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Engineer;
use App\Models\EngineerPhone;

class EngineerPhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //seeder phone
        $engineerPhones = [
            ['phone'=>'3751226303', 'engineer_name' => 'Edgar Avila Gonzalez'],
            ['phone'=>'3327074306', 'engineer_name' => 'Edgar Avila Gonzalez']
        ];

        //itera la lista de elementos a crear
        foreach ($engineerPhones as $engineerPhone){
            $engineer = Engineer::where('name', $engineerPhone['engineer_name'])->first();
            if($engineer){
                EngineerPhone::firstOrCreate([
                    'phone' => $engineerPhone['phone'],
                    'engineer_id' => $engineer->id,
                ]);
            }
        }
    }
}
