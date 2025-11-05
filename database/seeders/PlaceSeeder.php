<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Place;
use App\Models\State;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Seeder de prueba de lugares
        // Ejemplo: crear lugares y asignarlos a zonas existentes
        $places = [
            ['name' => 'CIUDAD GUZMÁN', 'short_name' => 'CDG', 'state' => 'JALISCO'],
            ['name' => 'COLIMA', 'short_name' => 'COL', 'state' => 'COLIMA'],
            ['name' => 'GUADALAJARA', 'short_name' => 'GDL', 'state' => 'JALISCO'],
            ['name' => 'GUERRERO', 'short_name' => 'GRU / GUE', 'state' => 'GUERRERO'],
            ['name' => 'LA BARCA', 'short_name' => 'LBA', 'state' => 'JALISCO'],
            ['name' => 'LA PIEDAD', 'short_name' => 'LPE', 'state' => 'MICHOACÁN'],
            ['name' => 'MAZATLÁN', 'short_name' => 'MAS / MZT', 'state' => 'SINALOA'],
            ['name' => 'MANZANILLO', 'short_name' => 'MNZ', 'state' => 'COLIMA'],
            ['name' => 'PUERTO VALLARTA', 'short_name' => 'PVR', 'state' => 'JALISCO'],
            ['name' => 'SAYULA', 'short_name' => 'SAY', 'state' => 'JALISCO'],
            ['name' => 'TALA', 'short_name' => 'TAL', 'state' => 'JALISCO'],
            ['name' => 'TEPIC', 'short_name' => 'TEP', 'state' => 'NAYARIT'],
            ['name' => 'ZIHUATANEJO', 'short_name' => 'ZIHU', 'state' => 'GUERRERO'],
            ['name' => 'ZAMORA', 'short_name' => 'ZRA', 'state' => 'MICHOACÁN'],
            ['name' => 'AGUA PRIETA', 'short_name' => 'AGPR', 'state' => 'SONORA'],
            ['name' => 'BAJA CALIFORNIA NORTE', 'short_name' => 'BCN', 'state' => 'BAJA CALIFORNIA NORTE'],
            ['name' => 'CANANEA', 'short_name' => 'CANA', 'state' => 'SONORA'],
            ['name' => 'CABO SAN LUCAS', 'short_name' => 'CBCA / CSL', 'state' => 'BAJA CALIFORNIA SUR'],
            ['name' => 'CHIHUAHUA', 'short_name' => 'CHH', 'state' => 'CHIHUAHUA'],
            ['name' => 'CULIACÁN', 'short_name' => 'CLN', 'state' => 'SINALOA'],
            ['name' => 'COZUMEL', 'short_name' => 'COB', 'state' => 'QUINTANA ROO'],
            ['name' => 'DURANGO', 'short_name' => 'DGO', 'state' => 'DURANGO'],
            ['name' => 'GUAMÚCHIL', 'short_name' => 'GML', 'state' => 'SINALOA'],
            ['name' => 'GUASAVE', 'short_name' => 'GVE', 'state' => 'SINALOA'],
            ['name' => 'GUAYMAS', 'short_name' => 'GYS', 'state' => 'SONORA'],
            ['name' => 'HERMOSILLO', 'short_name' => 'HMO', 'state' => 'SONORA'],
            ['name' => 'CIUDAD JUÁREZ', 'short_name' => 'JUA', 'state' => 'CHIHUAHUA'],
            ['name' => 'LOS MOCHIS', 'short_name' => 'LMM', 'state' => 'SINALOA'],
            ['name' => 'LA PAZ', 'short_name' => 'LPAZ', 'state' => 'BAJA CALIFORNIA SUR'],
            ['name' => 'MAGDALENA DE KINO', 'short_name' => 'MAG', 'state' => 'SONORA'],
            ['name' => 'MONTERREY', 'short_name' => 'MTY', 'state' => 'NUEVO LEÓN'],
            ['name' => 'MEXICALI', 'short_name' => 'MXL', 'state' => 'BAJA CALIFORNIA'],
            ['name' => 'NAVOJOA', 'short_name' => 'NAV', 'state' => 'SONORA'],
            ['name' => 'NOCHISTLÁN', 'short_name' => 'NCGS', 'state' => 'ZACATECAS'],
            ['name' => 'NOGALES', 'short_name' => 'NOG', 'state' => 'SONORA'],
            ['name' => 'NAZAS', 'short_name' => 'NZRI', 'state' => 'DURANGO'],
            ['name' => 'PUERTO PEÑASCO', 'short_name' => 'PTOP', 'state' => 'SONORA'],
            ['name' => 'ACAPONETA', 'short_name' => 'ACP', 'state' => 'NAYARIT'],
            ['name' => 'ATIZAPÁN DE ZARAGOZA', 'short_name' => 'ATIZ', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'CIUDAD HIDALGO', 'short_name' => 'CD HGO', 'state' => 'MICHOACÁN'],
            ['name' => 'CIUDAD DE MÉXICO', 'short_name' => 'CDMX', 'state' => 'CIUDAD DE MÉXICO'],
            ['name' => 'CHICONCUAC', 'short_name' => 'CHCO', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'CHIAUTLA DE TAPIA', 'short_name' => 'CHD', 'state' => 'PUEBLA'],
            ['name' => 'CUAUTLA', 'short_name' => 'CLAU', 'state' => 'MORELOS'],
            ['name' => 'CALPULALPAN', 'short_name' => 'CLP', 'state' => 'TLAXCALA'],
            ['name' => 'CUERNAVACA', 'short_name' => 'CVJ', 'state' => 'MORELOS'],
            ['name' => 'EMILIANO ZAPATA', 'short_name' => 'EMZ', 'state' => 'MORELOS / VERACRUZ'],
            ['name' => 'HUETAMO', 'short_name' => 'HTCO', 'state' => 'MICHOACÁN'],
            ['name' => 'HUEJUTLA', 'short_name' => 'HUE', 'state' => 'HIDALGO'],
            ['name' => 'HUIXTLA', 'short_name' => 'HUI', 'state' => 'CHIAPAS'],
            ['name' => 'IXMIQUILPAN', 'short_name' => 'IXM', 'state' => 'HIDALGO'],
            ['name' => 'IZTAPALAPA', 'short_name' => 'IZTA', 'state' => 'CIUDAD DE MÉXICO'],
            ['name' => 'IZÚCAR DE MATAMOROS', 'short_name' => 'IZU', 'state' => 'PUEBLA'],
            ['name' => 'JOCOTEPEC', 'short_name' => 'JOJU', 'state' => 'JALISCO'],
            ['name' => 'JUCHITÁN DE ZARAGOZA', 'short_name' => 'JUC', 'state' => 'OAXACA'],
            ['name' => 'NAUCALPAN', 'short_name' => 'NAU', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'OAXACA DE JUÁREZ', 'short_name' => 'OAX', 'state' => 'OAXACA'],
            ['name' => 'PÁTZCUARO', 'short_name' => 'PCA', 'state' => 'MICHOACÁN'],
            ['name' => 'PUEBLA', 'short_name' => 'PUE', 'state' => 'PUEBLA'],
            ['name' => 'QUERÉTARO', 'short_name' => 'QRO', 'state' => 'QUERÉTARO'],
            ['name' => 'SANTA CRUZ', 'short_name' => 'SCRZ', 'state' => 'SONORA'],
            ['name' => 'TAPACHULA', 'short_name' => 'TAP', 'state' => 'CHIAPAS'],
            ['name' => 'TEHUACÁN', 'short_name' => 'TCH', 'state' => 'PUEBLA'],
            ['name' => 'TECOMÁN', 'short_name' => 'TCN', 'state' => 'COLIMA'],
            ['name' => 'TIHUATLÁN', 'short_name' => 'THU', 'state' => 'VERACRUZ'],
            ['name' => 'TANGANCÍCUARO', 'short_name' => 'TGO', 'state' => 'MICHOACÁN'],
            ['name' => 'TUXTLA GUTIÉRREZ', 'short_name' => 'TGZ', 'state' => 'CHIAPAS'],
            ['name' => 'TLALNEPANTLA', 'short_name' => 'TLN', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'TLAXCALA', 'short_name' => 'TLX', 'state' => 'TLAXCALA'],
            ['name' => 'TOLUCA', 'short_name' => 'TOL', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'VALLE DE BRAVO', 'short_name' => 'VBVO / VAL', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'VALLE DE JOJUTLA', 'short_name' => 'VJO', 'state' => 'MORELOS'],
            ['name' => 'ZITÁCUARO', 'short_name' => 'ZIT', 'state' => 'MICHOACÁN'],
            ['name' => 'ZAUTLA', 'short_name' => 'ZTO', 'state' => 'PUEBLA'],
            ['name' => 'ZUMPANGO', 'short_name' => 'ZUM', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'ACAPULCO', 'short_name' => 'ACA', 'state' => 'GUERRERO'],
            ['name' => 'AGUASCALIENTES', 'short_name' => 'AGS', 'state' => 'AGUASCALIENTES'],
            ['name' => 'BALANCÁN', 'short_name' => 'BAL', 'state' => 'TABASCO'],
            ['name' => 'CAMPECHE', 'short_name' => 'CAM / CPE', 'state' => 'CAMPECHE'],
            ['name' => 'CIUDAD DEL CARMEN', 'short_name' => 'CDC', 'state' => 'CAMPECHE'],
            ['name' => 'CELAYA', 'short_name' => 'CEL', 'state' => 'GUANAJUATO'],
            ['name' => 'CHAMPOTÓN', 'short_name' => 'CHAM', 'state' => 'CAMPECHE'],
            ['name' => 'CHIGNAHUAPAN', 'short_name' => 'CHGO', 'state' => 'PUEBLA'],
            ['name' => 'CÓRDOBA', 'short_name' => 'COR', 'state' => 'VERACRUZ'],
            ['name' => 'COSAMALOAPAN', 'short_name' => 'COS', 'state' => 'VERACRUZ'],
            ['name' => 'CANCÚN', 'short_name' => 'CUN', 'state' => 'QUINTANA ROO'],
            ['name' => 'DOLORES HIDALGO', 'short_name' => 'DOL', 'state' => 'GUANAJUATO'],
            ['name' => 'GUANAJUATO', 'short_name' => 'GTO', 'state' => 'GUANAJUATO'],
            ['name' => 'IRAPUATO', 'short_name' => 'IRA', 'state' => 'GUANAJUATO'],
            ['name' => 'JEREZ', 'short_name' => 'JER', 'state' => 'ZACATECAS'],
            ['name' => 'JALPA', 'short_name' => 'JLP', 'state' => 'ZACATECAS'],
            ['name' => 'LEÓN', 'short_name' => 'LEO', 'state' => 'GUANAJUATO'],
            ['name' => 'MARTÍNEZ DE LA TORRE', 'short_name' => 'MAR', 'state' => 'VERACRUZ'],
            ['name' => 'MÉRIDA', 'short_name' => 'MER', 'state' => 'YUCATÁN'],
            ['name' => 'MOROLEÓN', 'short_name' => 'MLN', 'state' => 'GUANAJUATO'],
            ['name' => 'MORELIA', 'short_name' => 'MOR', 'state' => 'MICHOACÁN'],
            ['name' => 'MATAMOROS', 'short_name' => 'MTZ', 'state' => 'TAMAULIPAS'],
            ['name' => 'ORIZABA', 'short_name' => 'ORZ', 'state' => 'VERACRUZ'],
            ['name' => 'PALENQUE', 'short_name' => 'PAL', 'state' => 'CHIAPAS'],
            ['name' => 'PAPANTLA', 'short_name' => 'PAP', 'state' => 'VERACRUZ'],
            ['name' => 'PENJAMILLO', 'short_name' => 'PEN / PLQ', 'state' => 'MICHOACÁN / GUANAJUATO'],
            ['name' => 'POZA RICA', 'short_name' => 'POZA', 'state' => 'VERACRUZ'],
            ['name' => 'PUERTO ESCONDIDO', 'short_name' => 'PRT', 'state' => 'OAXACA'],
            ['name' => 'SALAMANCA', 'short_name' => 'SAL / SALA', 'state' => 'GUANAJUATO / OAXACA'],
            ['name' => 'SAN JOSÉ ITURBIDE', 'short_name' => 'SJDI / SJO', 'state' => 'GUANAJUATO / AGUASCALIENTES'],
            ['name' => 'SAN JUAN DEL RÍO', 'short_name' => 'SJR', 'state' => 'QUERÉTARO'],
            ['name' => 'SAN LUIS POTOSÍ', 'short_name' => 'SLP / SLNP', 'state' => 'SAN LUIS POTOSÍ'],
            ['name' => 'SAN MIGUEL DE ALLENDE', 'short_name' => 'SMAL', 'state' => 'GUANAJUATO'],
            ['name' => 'TAMPICO', 'short_name' => 'TAM', 'state' => 'TAMAULIPAS'],
            ['name' => 'TIERRA BLANCA', 'short_name' => 'TBL', 'state' => 'VERACRUZ'],
            ['name' => 'TUXPAN', 'short_name' => 'TPX / TXP', 'state' => 'VERACRUZ'],
            ['name' => 'TUXTEPEC', 'short_name' => 'TTP / TXC', 'state' => 'OAXACA'],
            ['name' => 'VERACRUZ', 'short_name' => 'VER', 'state' => 'VERACRUZ'],
            ['name' => 'VILLAHERMOSA', 'short_name' => 'VLL / VSA', 'state' => 'TABASCO'],
            ['name' => 'XALAPA', 'short_name' => 'XAL', 'state' => 'VERACRUZ'],
            ['name' => 'ZACATECAS', 'short_name' => 'ZAC', 'state' => 'ZACATECAS'],
];

        foreach ($places as $data) {
            $state = State::where('name', $data['state'])->first(); // busca la zona por nombre

            if ($state) {
                Place::firstOrCreate(
                    [
                        'name' => $data['name'],
                        'short_name' => $data['short_name'],
                        'state_id' => $state->id,
                    ]
                );
            }
        }
    }
}
