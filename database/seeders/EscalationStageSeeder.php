<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EscalationStage;
class EscalationStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $escalation_levels = ['first', 'second', 'third', 'fourth'];

        foreach ($escalation_levels as $escalation_level) {
            EscalationStage::firstOrCreate(['escalation_levels' => $escalation_level]);
        }
    }
}
