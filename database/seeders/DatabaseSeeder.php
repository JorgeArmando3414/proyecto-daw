<?php

namespace Database\Seeders;

use App\Models\Cancion;
use App\Models\Lista;
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
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'Jorge User',
            'email' => 'jorge@jorge.com',
            'password' => bcrypt('jorgejorge'),
        ]);

        Lista::factory()->has(Cancion::factory()->count(5))->count(5)->create();
    }
}
