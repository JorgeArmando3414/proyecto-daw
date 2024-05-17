<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['id_lista', 'id_autor', 'contenido', 'fecha_publicacion'];

    public function autor()
    {
        return $this->belongsTo(User::class, 'id_autor');
    }

    public function lista()
    {
        return $this->belongsTo(Lista::class, 'id_lista');
    }
}
