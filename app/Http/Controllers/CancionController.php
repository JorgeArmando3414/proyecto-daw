<?php

namespace App\Http\Controllers;

use App\Models\Cancion;
use Illuminate\Http\Request;

class CancionController extends Controller
{
    public function subirCanciones(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:json'
        ]);

        $file = $request->file('file');
        $json = file_get_contents($file->getRealPath());
        $data = json_decode($json, true);

        if ($data === null) {
            return response()->json(['error' => 'Invalid JSON file'], 400);
        }

        foreach ($data as $songData) {
            Cancion::updateOrCreate(
                [
                    'nombre' => $songData['nombre'],
                    'album' => $songData['album'],
                    'artista' => $songData['artista'],
                    'genero' => $songData['genero'],
                ]
            );
        }

        return response()->json(['Canciones actualizadas']);
    }
}
