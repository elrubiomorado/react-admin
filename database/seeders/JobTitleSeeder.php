<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobTitle;
use App\Models\Team;
class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // seeder
        //campos a poblar
        $jobTitles = [
            //Ingenieros
            ['title' => 'Ingeniero en Desarrollo', 'team' => 'NOC'],
            ['title' => 'Ingeniero en NOC Datacenter', 'team' => 'NOC'],
            ['title' => 'Ingeniero de Aseguramiento y Continuidad / Padre de Familia Migajeritos', 'team' => 'NOC' ],
            ['title' => 'Ingeniero de Operacion y Soporte MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Ingeniero de Soporte MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Ingeniero de Operacion MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Ingeniero de Implementacion MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Ingeniero de Preventa MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Ingeniero de campo TI', 'team' => 'Ingenieria' ],
            ['title' => 'Ingeniero de Fibras', 'team' => 'Ingenieria' ],
            ['title' => 'Ingeniero de Soporte y Operacion', 'team' => 'Ingenieria' ],
            ['title' => 'Ingeniero de Redes', 'team' => 'Redes' ],
            ['title' => 'Ingeniero de Redes Planta Interna', 'team' => 'Redes/CTC' ],
            ['title' => 'Ingeniero de Redes y Telecomunicaciones', 'team' => 'Redes' ],
            ['title' => 'Ingeniero de Infraestructura', 'team' => 'Infraestructura' ],
            ['title' => 'Ingeniero de Servicios', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Servicios SR', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Servicios JR', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Servicios Planta Interna', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Servicios Planta Interna SR', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Servicios Planta Interna JR', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Planta Interna', 'team' => 'CTC' ],
            ['title' => 'Ingeniero de Planta Interna SR', 'team' => 'CTC' ],
            ['title' => 'Ingeniero Planta Interna Jr', 'team' => 'CTC'],
            ['title' => 'Ingeniero Planta Interna de Cluster', 'team' => 'CTC'],


            //Supervisores
            ['title' => 'Supervisor de CTC', 'team' => 'CTC' ],
            ['title' => 'Supervisor de Tecnico', 'team' => 'CTC'],
            ['title' => 'Supervisor GPON', 'team' => 'CTC'],
            ['title' => 'Supervisor de Obra', 'team' => 'CTC'],
            ['title' => 'Supervisor de Construccion', 'team' => 'CTC'],
            ['title' => 'Supervisor de Construccion FTTH', 'team' => 'CTC'],
            ['title' => 'Supervisor de Construccion Y Mantenimiento', 'team' => 'CTC'],
            ['title' => 'Supervisor de Mantenimiento', 'team' => 'Planta Externa'],
            ['title' => 'Supervisor de Mantenimiento 1D', 'team' => 'Planta Externa'],
            ['title' => 'Supervisor de Mantenimiento 2D', 'team' => 'Planta Externa'],
            ['title' => 'Supervisor de Mantenimiento N1', 'team' => 'Planta Externa'],
            ['title' => 'Supervisor de Mantenimiento N2', 'team' => 'Planta Externa'],
            ['title' => 'Supervisor de Mantenimiento Corporativo', 'team' => 'Mantenimiento'],
            ['title' => 'Supervisor de Mantenimiento Corporativo Enlaces', 'team' => 'MCA'],
            ['title' => 'Supervisor de Mantenimiento Corporativo Enlaces NOC', 'team' => 'MCA'],
            ['title' => 'Supervisor de Mantenimiento Corporativo Nodos/GPON', 'team' => 'MCA'],
            ['title' => 'Supervisor de Mantenimiento Corporativo Fallas de línea', 'team' => 'MCA'],
            ['title' => 'Supervisor de Infraestructura Corporativo', 'team' => 'Infraestructura'],
            ['title' => 'Supervisor de CTC Corporativo', 'team' => 'CTC'],
            ['title' => 'Supervisor de Construccion MCA', 'team' => 'MCA'],
            ['title' => 'Supervisor de Mesa de Analisis', 'team' => 'Analisis'],
            ['title' => 'Supervisor de Radio Mantenimiento', 'team' => 'Mantenimiento'],
            ['title' => 'Supervisor de Metrocarrier', 'team' => 'MCA'],
            ['title' => 'Supervisor de Redes y Telecomunicaciones', 'team' => 'Redes' ],
            ['title' => 'Supervisor de Redes', 'team' => 'Redes' ],
            ['title' => 'Supervisor de Operaciones', 'team' => 'Operaciones' ],
            ['title' => 'Supervisor de Atención Domiciliaria', 'team' => 'Infraestructura' ],
            ['title' => 'Supervisor de Implementación Infraestructura Planta Interna Corporativo', 'team' => 'Infraestructura/CTC' ],
            ['title' => 'Supervisor de N1', 'team' => 'NOC'],
            ['title' => 'Supervisor de Radio Controlador CYM D1 y D3', 'team' => 'NOC'],
            ['title' => 'Supervisor de Radio Controlador CYM D2 y D4', 'team' => 'NOC'],

            //Jefes
            ['title' => 'Jefe Tecnico ', 'team' => 'CTC' ],
            ['title' => 'Jefe de NOC DC ', 'team' => 'NOC' ],
            ['title' => 'Jefe de NOC DC ', 'team' => 'NOC' ],
            ['title' => 'Jefe de Sistema', 'team' => 'Sistema' ],
            ['title' => 'Jefe de Servicios Planta Interna', 'team' => 'CTC' ],
            ['title' => 'Jefe de Redes', 'team' => 'Redes' ],
            ['title' => 'Jefe de Redes y Telecomunicaciones', 'team' => 'Redes' ],
            ['title' => 'Jefe de Construccion', 'team' => 'Construccion' ],
            ['title' => 'Jefe de Infraestructura', 'team' => 'Infraestructura' ],
            ['title' => 'Jefe de Infraestructura Planta Interna', 'team' => 'Infraestructura/CTC' ],
            ['title' => 'Jefe de Obra', 'team' => 'Infraestructura' ],
            ['title' => 'Jefe de Obra Civil', 'team' => 'Infraestructura' ],
            ['title' => 'Jefe de Planta Interna', 'team' => 'CTC' ],
            ['title' => 'Jefe de MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Jefe de Ingenieria MCA', 'team' => 'MCA' ],
            ['title' => 'Jefe Tecnico de MCA', 'team' => 'MCA' ],
            ['title' => 'Jefe de Construccion y Mantenimiento', 'team' => 'CTC' ],
            ['title' => 'Jefe de Mantenimiento', 'team' => 'CTC' ],
            ['title' => 'Jefe de Mantenimiento Preventivo', 'team' => 'CTC' ],
            ['title' => 'Jefe de Mantenimiento Correctivo', 'team' => 'CTC' ],
            ['title' => 'Jefe Tecnico Foraneos', 'team' => 'CTC' ],

            //Auxiliares
            ['title' => 'Auxiliar de CTC', 'team' => 'CTC' ],
            ['title' => 'Auxiliar de CTC 1D', 'team' => 'CTC' ],
            ['title' => 'Auxiliar de CTC 2D', 'team' => 'CTC' ],
            ['title' => 'Auxiliar de Administrativo', 'team' => 'Administrativo' ],
            ['title' => 'Auxiliar de Supervisor de Redes', 'team' => 'Redes' ],
            ['title' => 'Auxiliar de Infraestructura', 'team' => 'Infraestructura' ],
            ['title' => 'Auxiliar de Infraestructura Planta Interna', 'team' => 'Infraestructura/CTC' ],

            // Gerencia
            //Occidente, Norte
            ['title' => 'Subgerente', 'team' => 'Gerencia' ],
            ['title' => 'Gerente de Sistema', 'team' => 'Gerencia' ],
            ['title' => 'Gerente RNOC', 'team' => 'RNOC' ],
            ['title' => 'Gerente Regional Tecnico', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional General', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional de Ingenieria MCA', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Tecnico', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Mantenimiento', 'team' => 'Gerencia' ],
            ['title' => 'Gerente de servicio al cliente', 'team' => 'Gerencia' ],
            ['title' => 'Gerente de Closter', 'team' => 'Gerencia' ],
            //Sinaloa, Sonora, Sureste
            ['title' => 'Gerente Regional ATC', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional Tecnico Pacifico', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional Metrocarrier', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Sistema en Desarrollo', 'team' => 'Gerencia' ],
            ['title' => 'Gerente de Sistemas', 'team' => 'Gerencia' ],
            ['title' => 'Gerente de Sistemas Foraneos', 'team' => 'Gerencia' ],
            //Golfo, Bajio, Peninsula, TCCO
            ['title' => 'Gerente Regional Tecnico MCA ', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional de Ingenieria Golfo', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional General Golfo', 'team' => 'Gerencia' ],
            ['title' => 'Gerente Regional AT Domiciliaria', 'team' => 'Gerencia' ],

            //Coordinadores
            ['title' => 'Coordinador RNOC', 'team' => 'RNOC' ],
            ['title' => 'Coordinador RNOC N1', 'team' => 'RNOC' ],
            ['title' => 'Coordinador RNOC N2', 'team' => 'RNOC' ],
            ['title' => 'Coordinador MCA/Metrocarrier', 'team' => 'MCA' ],
            ['title' => 'Coordinador de Mesa de analisis', 'team' => 'Administrativo' ],
            ['title' => 'Coordinador de Mantenimiento', 'team' => 'CTC' ],
            ['title' => 'Coordinador de Mantenimiento Corporativo', 'team' => 'Corporativo' ],

            //Comodines
            ['title' => 'Director (DT)', 'team' => 'Administrativo' ],
            ['title' => 'FD', 'team' => 'Administrativo' ],
            ['title' => 'JYT', 'team' => 'Administrativo' ],
            ['title' => 'BA', 'team' => 'Administrativo' ],
            ['title' => 'PyC', 'team' => 'Administrativo' ],
            ['title' => 'JR Y T', 'team' => 'CTC' ],
            ['title' => 'Director (DT)', 'team' => 'Administrativo' ],
            ['title' => 'Datacenter', 'team' => 'Datacenter' ],
            ['title' => 'NOC Datacenter', 'team' => 'Datacenter NOC' ],
            ['title' => 'RNOC', 'team' => 'RNOC' ],
            ['title' => 'Metrocarrier (MCA)', 'team' => 'MCA' ],

            //Radio
            ['title' => 'Radio Operador', 'team' => 'Radio' ],
            ['title' => 'Radio Operador N1', 'team' => 'Radio' ],
            ['title' => 'Radio Operador CYM', 'team' => 'Radio' ],
            ['title' => 'Radio Operador RNOC', 'team' => 'RNOC' ],
            ['title' => 'Radio Controlador', 'team' => 'Radio' ],
            ['title' => 'Radio Controlador CYM', 'team' => 'Radio' ],
            ['title' => 'Radio Controlador CYM Grupo 1', 'team' => 'Radio' ],
            ['title' => 'Radio Controlador CYM Grupo 1 (SNR)', 'team' => 'Radio' ],
            ['title' => 'Radio Controlador CYM Grupo 2', 'team' => 'Radio' ],
            ['title' => 'Radio Controlador CYM Grupo 3', 'team' => 'Radio' ],

        ];

        //foreach para iterar en el array de filas a crear
        foreach ($jobTitles as $data) {
            //buscamos el primer elemento que coincida con el nombre del team que queremos agregar
            $team = Team::where('name', $data['team'])->first();
            //Si existe creamos con la info
            if ($team) {
                JobTitle::firstOrCreate([
                    'title' => $data['title'],
                    'team_id' => $team->id,
                ]);
            }
        }
    }
}
