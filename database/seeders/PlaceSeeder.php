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

            // AGUASCALIENTES
            ['name' => 'AGUASCALIENTES', 'short_name' => 'AGS', 'state' => 'AGUASCALIENTES'],
            ['name' => 'CALVILLO', 'short_name' => 'CLY', 'state' => 'AGUASCALIENTES'],
            ['name' => 'SAN JOSÉ DE INTURBIDE', 'short_name' => 'SJO', 'state' => 'AGUASCALIENTES'],

            // BAJA CALIFORNIA
            ['name' => 'MEXICALI', 'short_name' => 'MXL', 'state' => 'BAJA CALIFORNIA'],

            // BAJA CALIFORNIA NORTE
            ['name' => 'BAJA CALIFORNIA NORTE', 'short_name' => 'BCN', 'state' => 'BAJA CALIFORNIA NORTE'],

            // BAJA CALIFORNIA SUR listop
            ['name' => 'CABO SAN LUCAS / TODOS SANTOS', 'short_name' => 'CBCA / CSL', 'state' => 'BAJA CALIFORNIA SUR'],
            ['name' => 'LA PAZ / GUERRERO NEGRO', 'short_name' => 'LPAZ / GNR', 'state' => 'BAJA CALIFORNIA SUR'],
            ['name' => 'SAN JOSE DEL CABO', 'short_name' => 'SJDC', 'state' => 'BAJA CALIFORNIA SUR'],

            // CAMPECHE
            ['name' => 'CAMPECHE', 'short_name' => 'CAM / CPE', 'state' => 'CAMPECHE'],
            ['name' => 'CHAMPOTÓN', 'short_name' => 'CHAM', 'state' => 'CAMPECHE'],
            ['name' => 'CIUDAD DEL CARMEN', 'short_name' => 'CDC', 'state' => 'CAMPECHE'],

            // CHIAPAS listop
            // ['name' => 'LA DEMOCRACIA', 'short_name' => 'LDM', 'state' => 'CHIAPAS'],
            //['name' => 'PALENQUE', 'short_name' => 'PAL', 'state' => 'CHIAPAS'],
            ['name' => 'TAPACHULA', 'short_name' => 'TAP', 'state' => 'CHIAPAS'],
            ['nam ame' => 'varios', 'state' => 'CHIAPAS'],
            ['name' => 'VILLAFLORES', 'short_name' => 'VLF', 'state' => 'CHIAPAS'],
            ['name' => 'COMITLAN', 'short_name' => 'CMT', 'state' => 'CHIAPAS'],
            ['name' => 'TONALA/ARRIAGA/PIJIJIAPAN', 'short_name' => 'VARIOS', 'state' => 'CHIAPAS'],
            ['name' => 'MAPASTEPEC/HUIXTLA', 'short_name' => 'VARIOS', 'state' => 'CHIAPAS'],


            // CHIHUAHUA
            ['name' => 'CHIHUAHUA', 'short_name' => 'CHH', 'state' => 'CHIHUAHUA'],
            ['name' => 'CIUDAD JUÁREZ', 'short_name' => 'JUA', 'state' => 'CHIHUAHUA'],

            // CIUDAD DE MÉXICO
            ['name' => 'CIUDAD DE MÉXICO', 'short_name' => 'CDMX', 'state' => 'CIUDAD DE MÉXICO'],
            ['name' => 'IZTAPALAPA', 'short_name' => 'IZTA', 'state' => 'CIUDAD DE MÉXICO'],

            // COLIMA
            ['name' => 'COLIMA', 'short_name' => 'COL', 'state' => 'COLIMA'],
            ['name' => 'MANZANILLO', 'short_name' => 'MNZ', 'state' => 'COLIMA'],
            ['name' => 'TECOMÁN', 'short_name' => 'TCN', 'state' => 'COLIMA'],

            // DURANGO LISTOP
            ['name' => 'DURANGO', 'short_name' => 'DGO', 'state' => 'DURANGO'],
            //['name' => 'NAZAS', 'short_name' => 'NZRI', 'state' => 'DURANGO'],

            // ESTADO DE MÉXICO
            ['name' => 'ATIZAPÁN DE ZARAGOZA', 'short_name' => 'ATIZ', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'NAUCALPAN', 'short_name' => 'NAU', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'SAN JUAN IXHUATEPEC', 'short_name' => 'SJI', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'TLALNEPANTLA', 'short_name' => 'TLN', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'TOLUCA', 'short_name' => 'TOL', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'VALLE DE BRAVO', 'short_name' => 'VBVO / VAL', 'state' => 'ESTADO DE MÉXICO'],
            ['name' => 'ZUMPANGO', 'short_name' => 'ZUM', 'state' => 'ESTADO DE MÉXICO'],

            // GUANAJUATO
            ['name' => 'CELAYA', 'short_name' => 'CEL', 'state' => 'GUANAJUATO'],
            ['name' => 'DOLORES HIDALGO', 'short_name' => 'DOL', 'state' => 'GUANAJUATO'],
            ['name' => 'GUANAJUATO', 'short_name' => 'GTO', 'state' => 'GUANAJUATO'],
            ['name' => 'IRAPUATO', 'short_name' => 'IRA', 'state' => 'GUANAJUATO'],
            ['name' => 'LEÓN', 'short_name' => 'LEO', 'state' => 'GUANAJUATO'],
            ['name' => 'MOROLEÓN', 'short_name' => 'MLN', 'state' => 'GUANAJUATO'],
            ['name' => 'PÉNJAMO', 'short_name' => 'PLQ', 'state' => 'GUANAJUATO'],
            ['name' => 'SALAMANCA', 'short_name' => 'SAL', 'state' => 'GUANAJUATO'],
            ['name' => 'SAN JOSÉ ITURBIDE', 'short_name' => 'SJDI', 'state' => 'GUANAJUATO'],
            ['name' => 'SAN MIGUEL DE ALLENDE', 'short_name' => 'SMAL', 'state' => 'GUANAJUATO'],

            // GUERRERO
            ['name' => 'ACAPULCO', 'short_name' => 'ACA', 'state' => 'GUERRERO'],
            ['name' => 'GUERRERO', 'short_name' => 'GRU / GUE', 'state' => 'GUERRERO'],
            ['name' => 'ZIHUATANEJO', 'short_name' => 'ZIHU', 'state' => 'GUERRERO'],

            // HIDALGO
            ['name' => 'HUEJUTLA', 'short_name' => 'HUE', 'state' => 'HIDALGO'],
            ['name' => 'IXMIQUILPAN', 'short_name' => 'IXM', 'state' => 'HIDALGO'],

            // JALISCO    listop
            ['name' => 'ACATLÁN / SAYULA / TAPALPA / ZACOALCO / TECHALUTA / ATOYAC / CD. GUZMAN / TEOCUITATLAN', 'short_name'  => 'ACA/SAY/TAP/ZAC/TEC/ATO/CDG/TEO', 'state' => 'JALISCO'],
            ['name' => 'AUTLAN DE NAVARRO / COLIMA /CIUDAD GUZMAN', 'short_name' => 'GDL', 'state' => 'JALISCO'],
            ['name' => 'GUADALAJARA', 'short_name' => 'GDL', 'state' => 'JALISCO'],
            // ? ['name' => 'JOCOTEPEC', 'short_name' => 'JOJU', 'state' => 'JALISCO'],
            ['name' => 'MANZANILLO', 'short_name' => 'MAN', 'state' => 'JALISCO'],
            ['name' => 'LA BARCA / OCOTLÁN', 'short_name' => 'LBA', 'state' => 'JALISCO'],
            ['name' => 'LA PIEDAD', 'short_name' => 'LPD', 'state' => 'JALISCO'],
            ['name' => 'PUERTO VALLARTA / BUCERIAS / MEZCALES', 'short_name' => 'PVR', 'state' => 'JALISCO'],
            ['name' => 'TALA / COCULA / AMECA / AHUALCO DE MERCADO / SAN MARTIN HIDALGO / TALPA / MASCOTA / ATENGUILLO / MAGDALENA', 'short_name'=> 'TAL/COC/AME/AHM/SMI/TAL/MAS/ATE/MAG', 'state' => 'JALISCO'],
            // X2 ['name' => 'SAYULA', 'short_name' => 'SAY', 'state' => 'JALISCO'],
            ['name' => 'SAHUAYO / CARRANZA / MAZAMITLA / SAN JOSE DE GRACIA / JIQUILPAN ', 'short_name'=> 'SAHU/CARZA/MZMT/SJDG/JQPN', 'state' => 'JALISCO'],
            ['name' => 'TEQUILA / ARENAL / AMATITAN / LA VENTA', 'short_name' => 'TEQ/ARE/AMA/LAV', 'state' => 'JALISCO'],
            ['name' => 'TEPIC / LA PENITA', 'short_name' => 'TEPC/LPE', 'state' => 'JALISCO'],
            // CONTACTO DE TLAQ ?['name' => 'TONALÁ', 'short_name' => 'TON', 'state' => 'JALISCO'],
            ['name' => 'TLAQUEPAQUE', 'short_name' => 'TLQ', 'state' => 'JALISCO'],
            ['name' => 'TLAJOMULCO', 'short_name' => 'TLA', 'state' => 'JALISCO'],
            ['name' => 'URUAPAN', 'short_name' => 'URU', 'state' => 'JALISCO'],
            ['name' => 'YURECUARO', 'short_name' => 'YUR', 'state' => 'JALISCO'],
            // ? name' => 'ZAPOPAN', 'short_name' => 'ZAP', 'state' => 'JALISCO'],
            ['name' => 'ZAMORA / CONCEPCION / BUENOS AIRES / VILLAMAR / VENUSTIANO', 'short_name' => 'ZAM/CONC/BUA/VIL/VEN', 'state' => 'JALISCO'],            ['name' => 'ZONA METROPOLITANA DE GUADALAJARA', 'short_name' => 'ZMG', 'state' => 'JALISCO'],




            // MICHOACÁN
            ['name' => 'CIUDAD HIDALGO', 'short_name' => 'CD HGO', 'state' => 'MICHOACÁN'],
            ['name' => 'LA PIEDAD', 'short_name' => 'LPE', 'state' => 'MICHOACÁN'],
            ['name' => 'MORELIA', 'short_name' => 'MOR', 'state' => 'MICHOACÁN'],
            ['name' => 'PARÁCUARO', 'short_name' => 'PRZ', 'state' => 'MICHOACÁN'],
            ['name' => 'PÁTZCUARO', 'short_name' => 'PCA', 'state' => 'MICHOACÁN'],
            ['name' => 'TANGANCÍCUARO', 'short_name' => 'TGO', 'state' => 'MICHOACÁN'],
            ['name' => 'ZAMORA', 'short_name' => 'ZRA', 'state' => 'MICHOACÁN'],
            ['name' => 'ZITÁCUARO', 'short_name' => 'ZIT', 'state' => 'MICHOACÁN'],

            // MORELOS
            ['name' => 'CUAUTLA', 'short_name' => 'CLAU', 'state' => 'MORELOS'],
            ['name' => 'CUERNAVACA', 'short_name' => 'CVJ', 'state' => 'MORELOS'],
            ['name' => 'EMILIANO ZAPATA', 'short_name' => 'EMZ', 'state' => 'MORELOS'],
            ['name' => 'VALLE DE JOJUTLA', 'short_name' => 'VJO', 'state' => 'MORELOS'],

            // NAYARIT
            ['name' => 'ACAPONETA', 'short_name' => 'ACP', 'state' => 'NAYARIT'],
            ['name' => 'TEPIC', 'short_name' => 'TEP', 'state' => 'NAYARIT'],

            // NUEVO LEÓN
            ['name' => 'MONTERREY', 'short_name' => 'MTY', 'state' => 'NUEVO LEÓN'],

            // OAXACA listop
            ['name' => 'OAXACA DE JUÁREZ', 'short_name' => 'OAX', 'state' => 'OAXACA'],
           // ['name' => 'PUERTO ESCONDIDO', 'short_name' => 'PRT', 'state' => 'OAXACA'],
            ['name' => 'SALINA CRUZ / TEHUANTEPEC/JUCHITÁN/MATIAS ROMERO/IXTEPEC / UNION HIDALGO', 'short_name' => 'SALA', 'state' => 'OAXACA'],
           // ['name' => 'TUXTEPEC', 'short_name' => 'TTP / TXC', 'state' => 'OAXACA'],
           // ['name' => 'VILLAHERMOSA', 'short_name' => 'VLL / VSA', 'state' => 'OAXACA'],
            ['name' => 'TEHUACAN', 'short_name' => 'TEHU', 'state' => 'OAXACA'],
            ['name' => 'HUATULCO', 'short_name' => 'HUA', 'state' => 'OAXACA'],

            // PUEBLA listop
            ['name' => 'TECAMACHALCO', 'short_name' => 'TCM', 'state' => 'PUEBLA'],
            ['name' => 'CALPULALPAN', 'short_name' => 'CPN', 'state' => 'PUEBLA'],
            ['name' => 'PUEBLA', 'short_name' => 'PUE', 'state' => 'PUEBLA'],
           // ['name' => 'TEHUACÁN', 'short_name' => 'TCH', 'state' => 'PUEBLA'],
           // ['name' => 'ZAUTLA', 'short_name' => 'ZTO', 'state' => 'PUEBLA'],

            // QUERÉTARO
            ['name' => 'QUERÉTARO', 'short_name' => 'QRO', 'state' => 'QUERÉTARO'],
            ['name' => 'SAN JUAN DEL RÍO', 'short_name' => 'SJR', 'state' => 'QUERÉTARO'],

            // QUINTANA ROO
            ['name' => 'CANCÚN', 'short_name' => 'CUN', 'state' => 'QUINTANA ROO'],
            ['name' => 'COZUMEL', 'short_name' => 'COB', 'state' => 'QUINTANA ROO'],

            // SAN LUIS POTOSÍ
            ['name' => 'SAN ANTONIO', 'short_name' => 'SAO', 'state' => 'SAN LUIS POTOSÍ'],
            ['name' => 'SAN LUIS POTOSÍ', 'short_name' => 'SLP / SLNP', 'state' => 'SAN LUIS POTOSÍ'],

            // SINALOA  listop
            ['name' => 'CULIACÁN / PERICOS', 'short_name' => 'CLN', 'state' => 'SINALOA'],
            ['name' => 'GUAMÚCHIL', 'short_name' => 'GML', 'state' => 'SINALOA'],
            ['name' => 'GUASAVE', 'short_name' => 'GVE', 'state' => 'SINALOA'],
            ['name' => 'LOS MOCHIS', 'short_name' => 'LMM', 'state' => 'SINALOA'],
            ['name' => 'MAZATLÁN', 'short_name' => 'MAS / MZT', 'state' => 'SINALOA'],

            // SONORA listop
            ['name' => 'CANANEA / NACOZARI / AGUA PRIETA', 'short_name' => 'CANA/NCZI/AGPR', 'state' => 'SONORA'],
            ['name' => 'CABORCA', 'short_name' => 'CBA', 'state' => 'SONORA'],
            ['name' => 'CIUDAD OBREGON', 'short_name' => 'COB', 'state' => 'SONORA'],
            ['name' => 'GUAYMAS / EMPALME', 'short_name' => 'GYS', 'state' => 'SONORA'],
            ['name' => 'HERMOSILLO / MIGUEL ALEMAN', 'short_name' => 'HMO/MGAM', 'state' => 'SONORA'],
            ['name' => 'MAGDALENA DE KINO / SANTA ANA', 'short_name' => 'MAGK', 'state' => 'SONORA'],
            ['name' => 'MEXICALI', 'short_name' => 'MXL', 'state' => 'SONORA'],
            ['name' => 'NAVOJOA / ALAMOS / HUATABAMPO  ', 'short_name' => 'NAV/ALM/HUAT', 'state' => 'SONORA'],
            ['name' => 'NOGALES', 'short_name' => 'NOG', 'state' => 'SONORA'],
            ['name' => 'PUERTO PEÑASCO', 'short_name' => 'PTOP', 'state' => 'SONORA'],
            ['name' => 'TIJUANA', 'short_name' => 'TIJ', 'state' => 'SONORA'],
            ['name' => 'SAN LUIS RC', 'short_name' => 'SANL', 'state' => 'SONORA'],
            ['name' => 'SAN FELIPE', 'short_name' => 'SANF', 'state' => 'SONORA'],


            // TABASCO
            ['name' => 'BALANCÁN', 'short_name' => 'BAL', 'state' => 'TABASCO'],
            ['name' => 'VILLAHERMOSA', 'short_name' => 'VLL / VSA', 'state' => 'TABASCO'],

            // TAMAULIPAS
            ['name' => 'MATAMOROS', 'short_name' => 'MTZ', 'state' => 'TAMAULIPAS'],
            ['name' => 'TAMPICO', 'short_name' => 'TAM', 'state' => 'TAMAULIPAS'],

            // TLAXCALA
            ['name' => 'CALPULALPAN', 'short_name' => 'CLP', 'state' => 'TLAXCALA'],
            ['name' => 'TLAXCALA', 'short_name' => 'TLX', 'state' => 'TLAXCALA'],

            // VERACRUZ
            ['name' => 'CÓRDOBA', 'short_name' => 'COR', 'state' => 'VERACRUZ'],
            ['name' => 'COSAMALOAPAN', 'short_name' => 'COS', 'state' => 'VERACRUZ'],
            ['name' => 'EMILIANO ZAPATA', 'short_name' => 'EZA', 'state' => 'VERACRUZ'],
            ['name' => 'MARTÍNEZ DE LA TORRE', 'short_name' => 'MAR', 'state' => 'VERACRUZ'],
            ['name' => 'ORIZABA', 'short_name' => 'ORZ', 'state' => 'VERACRUZ'],
            ['name' => 'PAPANTLA', 'short_name' => 'PAP', 'state' => 'VERACRUZ'],
            ['name' => 'POZA RICA', 'short_name' => 'POZA', 'state' => 'VERACRUZ'],
            ['name' => 'TIERRA BLANCA', 'short_name' => 'TBL', 'state' => 'VERACRUZ'],
            ['name' => 'TUXPAN', 'short_name' => 'TPX / TXP', 'state' => 'VERACRUZ'],
            ['name' => 'VERACRUZ', 'short_name' => 'VER', 'state' => 'VERACRUZ'],
            ['name' => 'XALAPA', 'short_name' => 'XAL', 'state' => 'VERACRUZ'],

            // YUCATÁN
            ['name' => 'MÉRIDA', 'short_name' => 'MER', 'state' => 'YUCATÁN'],

            // ZACATECAS
            ['name' => 'JALPA', 'short_name' => 'JLP', 'state' => 'ZACATECAS'],
            ['name' => 'JEREZ', 'short_name' => 'JER', 'state' => 'ZACATECAS'],
            ['name' => 'NOCHISTLÁN', 'short_name' => 'NCGS', 'state' => 'ZACATECAS'],
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
