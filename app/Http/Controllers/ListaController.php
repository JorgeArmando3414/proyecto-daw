<?php

namespace App\Http\Controllers;

use App\Models\Cancion;
use App\Models\Lista;
use App\Http\Requests\StoreListaRequest;
use App\Http\Requests\UpdateListaRequest;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ListaController extends Controller
{

    public function listasOfFollowedUsers()
    {
        $user = auth()->user();
        // Fetch the list of users that the authenticated user is following
        $followedUsers = $user->siguiendoObj;
        // Retrieve the listas associated with the users followed by the authenticated user
        $listasOfFollowedUsers = collect();
        foreach ($followedUsers as $followedUser) {
            $user = User::find($followedUser->id);
            $user->foto = $user->getFotoPerfil();
            $listas = $user->listas()->with('cancions', 'usuario')->orderBy('updated_at', 'desc')->get();
            foreach ($listas as $lista) {
                $lista->formateado_created_at = Carbon::parse($lista->created_at)->format('d-m-Y');
                $lista->usuario = $user;
            }
            $listasOfFollowedUsers = $listasOfFollowedUsers->merge($listas);
//            $followedUser->listas
        }
        return response()->json($listasOfFollowedUsers);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userListas = Lista::where('creado_por', auth()->id())->get();
        $canciones = Cancion::all();

        $userListas->load('cancions', 'usuario');
        foreach ($userListas as $lista) {
            $lista->formateado_created_at = Carbon::parse($lista->created_at)->format('d-m-Y');
            $lista->puntuacion_media = $lista->puntuaciones->avg('puntuacion');
        }

        return inertia('Lista/Index',[
            'userListas' => $userListas,
            'allCanciones' => $canciones,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListaRequest $request)
    {
        $data = $request->validated();
        $data['creado_por']= Auth::id();
        $lista = Lista::create($data);
        $lista->cancions()->sync($request->canciones);
        return to_route('lista.index')
            ->with('success', 'Lista creada');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lista $lista)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lista $lista)
    {
        $allCanciones = Cancion::all();

        // Pass the data to the view
        return inertia('Lista/Edit', [
            'allCanciones' => $allCanciones,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListaRequest $request, Lista $lista)
    {

        $lista = Lista::find($request->id);

        $lista->nombre = $request->nombre;

        $lista->save();

        $lista->cancions()->sync($request->canciones);

        return redirect()->route('lista.index')->with('success', 'Lista updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $lista = Lista::find($id);
        $lista->delete();
        $lista->cancions()->sync([]);
        return to_route('lista.index')->with('success', 'Lista eliminada');

    }
}
