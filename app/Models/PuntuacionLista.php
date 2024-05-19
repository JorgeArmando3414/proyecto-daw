<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PuntuacionLista extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'puntuaciones_listas';

    protected $fillable = ['id_lista', 'id_usuario', 'puntuacion'];

    public function lista()
    {
        return $this->belongsTo(Lista::class, 'id_lista');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
