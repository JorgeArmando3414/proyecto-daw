<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Lista;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    public function index(Request $request)
    {
        $listaId = $request->query('lista_id');

        if ($listaId) {
            $comentarios = Comentario::where('id_lista', $listaId)->with('autor')->get();
            return response()->json($comentarios);
        }

        return response()->json(Comentario::all());
    }
    public function store(Request $request){
        $request->validate([
            'id_lista' => 'required|exists:listas,id',
            'id_autor' => 'required|exists:users,id',
            'contenido' => 'required|string',
            'fecha_publicacion' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $comentario = Comentario::create([
            'id_lista' => $request->id_lista,
            'id_autor' => $request->id_autor,
            'contenido' => $request->contenido,
            'fecha_publicacion' => $request->fecha_publicacion,
        ]);

        return redirect()->back()->with('success', 'Comentario creado');
    }
    public function destroy($id){
        $comentario = Comentario::find($id);
        $comentario->delete();
        return redirect()->back()->with('success', 'Comentario eliminado');
    }
}
