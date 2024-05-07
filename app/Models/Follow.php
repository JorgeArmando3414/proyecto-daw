<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = 'follows';
    protected $fillable = ['usuario_siguiendo', 'usuario_seguido'];
}
