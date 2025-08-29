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
        $municipal = $this->faker->city();            // e.g. "New Jersey"
        $barangay  = $this->faker->words(2, true);    // e.g. "Santa Catalina"
        $purokNum  = $this->faker->numberBetween(1, 9);

        // --- Municipal Code Rule ---
        $muniParts = explode(" ", $municipal);

        if (count($muniParts) > 1) {
            $firstWord = strtoupper($muniParts[0]);
            if (strlen($firstWord) === 3) {
                // take 3 letters + first letter of next word
                $muniCode = $firstWord . strtoupper(substr($muniParts[1], 0, 1));
            } else {
                // just take first 4 letters
                $muniCode = strtoupper(substr($firstWord, 0, 4));
            }
        } else {
            // single word municipal
            $muniCode = strtoupper(substr($municipal, 0, 4));
        }

        // --- Barangay Code (first letter of each word) ---
        $brgyCode = strtoupper(
            collect(explode(" ", $barangay))
                ->map(fn($w) => substr($w, 0, 1))
                ->implode("")
        );

        // --- Purok Code ---
        $purokCode  = "P{$purokNum}";

        // --- Random Unique Code ---
        $randomCode = strtoupper(Str::random(10));

        $fullCode   = "{$muniCode}-{$brgyCode}-{$purokCode}-{$randomCode}";

        return [
            'name'      => $this->faker->name(),
            'municipal' => $municipal,
            'barangay'  => $barangay,
            'purok'     => "Purok {$purokNum}",
            'code'      => $fullCode,
        ];
    }
}
