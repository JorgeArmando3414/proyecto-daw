<?php

namespace App\Http\Controllers;

use App\Models\Cancion;
use App\Models\Lista;
use App\Http\Requests\StoreListaRequest;
use App\Http\Requests\UpdateListaRequest;
use Illuminate\Support\Facades\Log;

class ListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userListas = Lista::where('creado_por', auth()->id())->get();
        $canciones = Cancion::all();

        $userListas->load('cancions');

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
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListaRequest $request, Lista $lista)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lista $lista)
    {
        //
    }
}
