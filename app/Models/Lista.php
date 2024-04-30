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

    public function cancions()
    {
        return $this->belongsToMany(Cancion::class);
    }
}
