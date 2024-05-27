<?php

namespace App\Http\Controllers;

use App\Models\Lista;
use App\Models\PuntuacionLista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PuntuacionListaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_lista' => 'required|exists:listas,id',
            'id_usuario' => 'required|exists:users,id',
            'puntuacion' => 'required|integer|min:1|max:5',
        ]);

        PuntuacionLista::updateOrCreate(
            [
                'id_lista' => $request->id_lista,
                'id_usuario' => $request->id_usuario,
            ],
            [
                'puntuacion' => $request->puntuacion,
            ]
        );

        return redirect()->back()->with('success', 'puntuacion guardada');
    }

    public function show($id_lista)
    {
        $lista = Lista::findOrFail($id_lista);

        $puntuaciones = PuntuacionLista::where('id_lista', $id_lista)->with('user')->get();

        $averagePuntuacion = $puntuaciones->avg('puntuacion');

        $userPuntuacion = PuntuacionLista::where('id_lista', $id_lista)
            ->where('id_usuario', auth()->id())
            ->value('puntuacion');

        if($userPuntuacion == null){
            $userPuntuacion = 0;
        }

        if($puntuaciones==null){
            $averagePuntuacion = 0;
        }

        return response()->json([
//            'puntuaciones' => $puntuaciones,
            'average_puntuacion' => $averagePuntuacion,
            'user_puntuacion' => $userPuntuacion,
        ]);
    }
}
