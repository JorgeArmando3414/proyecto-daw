<?php

namespace App\Http\Controllers;

use App\Models\Lista;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('username', 'like', "%$query%")->get();

        $listas = Lista::where('nombre', 'like', "%$query%")->get();

        return inertia('Resultados', [
            'users' => $users,
            'listas' => $listas,
        ]);
    }

}
