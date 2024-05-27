<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public function puntuaciones()
    {
        return $this->hasMany(PuntuacionLista::class, 'id_usuario');
    }
    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'id_autor');
    }
    public function getDesc(){
        return $this->desc;
    }
    public function getFotoPerfil(){
        if($this->foto){
            return Storage::url($this->foto);
        }
        return asset('/fotos/fotoDefault.jpg');
    }
    public function listas()
    {
        return $this->hasMany(Lista::class, 'creado_por');
    }
//    public function seguidos(){
//        return $this->belongsToMany(User::class, 'follows', 'usuario_seguido', 'usuario_siguiendo')->select('usuario_siguiendo');
//    }
    public function siguiendoObj(){
        return $this->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido');
    }
//    public function siguiendo(){
//        return $this->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido')->select('usuario_seguido');
//    }
    public function esta_siguiendo(User $user){
        return $this->siguiendo()->where('usuario_seguido', $user->id)->exists();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'foto',
        'desc',
        'rol',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
//        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
//            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
