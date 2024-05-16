<?php

namespace App\Http\Controllers;

use App\Http\Requests\FotoUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function show(User $user){
//        $user = auth()->user();
        $foto = $user->getFotoPerfil();
        $listas = $user->listas()->get();

        return Inertia::render('Profile/Show', [
            'user' => User::find($user),
            'foto' => $foto,
            'desc' => $user->getDesc(),
            'listN' => count($listas),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $request->user()->fill($request->validated());

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updatefoto(FotoUpdateRequest $request): RedirectResponse
    {
        $user = auth()->user();

        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $path = $foto->store('fotos/', 'public');
            $user->foto = $path; // Save file path in user model
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
