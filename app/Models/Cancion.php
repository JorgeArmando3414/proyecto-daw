<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cancion extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function listas()
    {
        return $this->belongsToMany(Lista::class);
    }

    protected $fillable = [
        'nombre',
        'album',
        'artista',
        'genero',
    ];
}
