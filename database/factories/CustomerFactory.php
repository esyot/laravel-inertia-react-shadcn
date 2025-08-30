<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $municipalities = [
            'Tubigon', 'Clarin', 'Calape', 'Sagbayan', 'Catigbian'
        ];

        $barangaysByMunicipality = [
            'Tubigon' => [
                'Poblacion', 'Tinangnan', 'Panaytayon', 'Pooc Oriental', 'Pooc Occidental', 'Bunacan',
                'Bagongbanwa', 'Bantoyan', 'Batasan', 'Binanlan', 'Buhangin',
                'Cabulihan', 'Cayam', 'Cogtong', 'Danao', 'Guiwanon',
                'Ilijan', 'Lapasan', 'Lipay', 'Macaas', 'Matabao',
                'Panaytayon', 'Panaytayon', 'Pandan', 'Pinayagan', 'Pooc',
                'Talenceras', 'Tubod', 'Ubojan', 'Villanueva'
            ],
            'Clarin' => [
                'Poblacion', 'Bacani', 'Bogtongbod', 'Bonbon', 'Buenavista',
                'Caboy', 'Caluwasan', 'Candajec', 'Cantoyoc', 'Comaang',
                'Danahao', 'Katipunan', 'Lajog', 'Mataub', 'Nahawan',
                'Pangapasan', 'Poblacion', 'Tontunan', 'Tubod', 'Villaflor'
            ],
            'Calape' => [
                'Poblacion', 'Abucay', 'Banlasan', 'Bentig', 'Binogawan',
                'Bonbon', 'Cabayugan', 'Cabulihan', 'Camanocan', 'Cantabas',
                'Cantugas', 'Cogton', 'Danao', 'Desamparados', 'Kahayag',
                'Kinabag-an', 'Labuon', 'Lawis', 'Liboron', 'Looc',
                'Macaas', 'Madangog', 'Magtongtong', 'Mandaug', 'Ondol',
                'Sampoangon', 'San Isidro', 'Santa Cruz', 'Sohoton',
                'Tultugan', 'U-og', 'Ulbojan'
            ],
            'Sagbayan' => [
                'Poblacion', 'Calangahan', 'Canmano', 'Cansagaya', 'Katipunan',
                'Langtad', 'Libertad Norte', 'Libertad Sur', 'Mantalongon',
                'Poblacion', 'San Agustin', 'San Antonio', 'San Isidro',
                'San Ramon', 'San Vicente', 'Santa Catalina', 'Santa Cruz',
                'Taguanao', 'Ubayon', 'Villafuerte'
            ],
            'Catigbian' => [
                'Poblacion', 'Alangawasan', 'Ambuan', 'Bahi', 'Bantuan',
                'Binaliw', 'Bonbon', 'Bongdo', 'Cambailan', 'Candumayao',
                'Cang-iras', 'Cansagub', 'Dagohoy', 'Haguilanan', 'Hinagdanan',
                'Las Vegas', 'Libertad', 'Mabini', 'Mahayag', 'Manduyog',
                'Rizal', 'Salvador', 'San Isidro', 'San Jose', 'San Pedro',
                'Santo Niño', 'Sinakayanan', 'Triple Union', 'Union'
            ]
        ];

        $municipal = $this->faker->randomElement($municipalities);
        $barangay = $this->faker->randomElement($barangaysByMunicipality[$municipal]);
        $purokNum = $this->faker->numberBetween(1, 5);

        $muniCode = strtoupper(substr($municipal, 0, 4));

        $brgyCode = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $barangay), 0, 3));

        $purokCode = "P{$purokNum}";

        $randomCode = strtoupper(Str::random(4));

        $fullCode = "{$muniCode}-{$brgyCode}-{$purokCode}-{$randomCode}";

        return [
            'name'      => $this->faker->name(),
            'municipal' => $municipal,
            'barangay'  => $barangay,
            'purok'     => "Purok {$purokNum}",
            'code'      => $fullCode,
        ];
    }
}