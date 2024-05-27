<?php

namespace App\Http\Controllers;

use App\Models\Lista;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('username', 'like', "%$query%")->get();

        $listas = Lista::where('nombre', 'like', "%$query%")->with('cancions','usuario')->get();

        foreach ($listas as $lista){
            $lista->formateado_created_at = Carbon::parse($lista->created_at)->format('d-m-Y');
        }

        $listasConCanciones = Lista::whereHas('cancions', function ($queryBuilder) use ($query) {
            $queryBuilder->where('nombre', 'like', "%$query%");
        })->with('cancions','usuario')->get();

        foreach ($listasConCanciones as $listac){
            $listac->formateado_created_at = Carbon::parse($listac->created_at)->format('d-m-Y');
        }

        return inertia('Resultados', [
            'query' => $query,
            'users' => $users,
            'listas' => $listas,
            'listasCanciones' => $listasConCanciones,
        ]);
    }

}
