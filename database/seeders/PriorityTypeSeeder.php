<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Priority;
use App\Models\Type;

class PriorityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorityTypes = [
            ['level' => 1, 'name' => 'CFE'],
            ['level' => 2, 'name' => 'CFE'],
            ['level' => 1, 'name' => 'CORTE'],
        ];

        foreach ($priorityTypes as $item) {
            $priority = Priority::where('level', $item['level'])->first();
            $type = Type::where('name', $item['name'])->first();

            if ($priority && $type) {
                DB::table('priority_type')->updateOrInsert(
                    [
                        'priority_id' => $priority->id,
                        'type_id' => $type->id,
                    ],
                    [] // puedes agregar columnas extra si tu tabla las tiene
                );
            }
        }
    }
}
