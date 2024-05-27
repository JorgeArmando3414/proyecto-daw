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
//        $this->call(CancionesTableSeeder::class);

        User::factory()->create([
            'username' => 'Jorge User',
            'email' => 'jorge@jorge.com',
            'password' => bcrypt('jorgejorge'),
            'rol' => 'admin',
        ]);
    }
}
