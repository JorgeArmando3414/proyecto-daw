<?php

namespace Database\Seeders;

use App\Models\Cancion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CancionesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonData = file_get_contents(database_path('seeders/canciones.json'));
        $canciones = json_decode($jsonData, true);

        // Insert data into database
        foreach ($canciones as $cancionData) {
            Cancion::create([
                'nombre' => $cancionData['nombre'],
                'album' => $cancionData['album'],
                'artista' => $cancionData['artista'],
                'genero' => $cancionData['genero'],
            ]);
        }
    }
}
