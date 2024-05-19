<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Post
 *
 * @mixin Builder
 */

class Lista extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'creado_por',
        'created_at',
        'updated_at',
    ];

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'id_autor');
    }
    public function cancions()
    {
        return $this->belongsToMany(Cancion::class);
    }
    public function puntuaciones()
    {
        return $this->hasMany(PuntuacionLista::class, 'id_lista');
    }
    public function usuario()
    {
        return $this->belongsTo(User::class, 'creado_por');
    }
}
