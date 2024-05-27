<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class   AdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        return inertia('Admin/Index',[
            'users' => $users,
        ]);
    }
    public function asignarRol(User $user)
    {
        $user->rol = 'admin';
        $user->save();

        return redirect()->route('admin.users.index')->with('success', 'Rol asignado correctamente');
    }
    public function quitarRol(User $user)
    {
        $user->rol = 'user';
        $user->save();

        return redirect()->route('admin.users.index')->with('success', 'Rol eliminado correctamente');
    }
}
