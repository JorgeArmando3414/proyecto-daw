<?php

use App\Http\Controllers\CancionController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ListaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', function () {
    return Inertia::render('Inicio', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

//Route::redirect('/', '/dashboard');

Route::get('/listas/followed', [ListaController::class, 'listasOfFollowedUsers']);

Route::post('/follow', [FollowController::class, 'follow']);
Route::post('/unfollow', [FollowController::class, 'unfollow']);
Route::get('/seguidores/{userId}', [FollowController::class, 'seguidores']);
Route::get('/siguiendo/{userId}', [FollowController::class, 'siguiendo']);

Route::get('/resultados', [SearchController::class, 'search'])->name('resultados');

Route::middleware(['auth','verified'])->group(function (){
    Route::get('/dashboard', fn()=> Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('lista', ListaController::class);
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
});

require __DIR__.'/auth.php';
