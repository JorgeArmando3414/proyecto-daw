<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;


    public function getDesc(){
        return $this->desc;
    }
    public function getFotoPerfil(){
        if($this->foto){
            return asset($this->foto);
        }
        return asset('/fotos/default.gif');
    }
    public function listas()
    {
        return $this->hasMany(Lista::class, 'creado_por');
    }
    public function follow(User $user)
    {
        $this->siguiendo()->attach($user->id,['created_at' => now(), 'updated_at' => now()]);
    }
    public function seguidos(){
        return $this->belongsToMany(User::class, 'follows', 'usuario_seguido', 'usuario_siguiendo');
    }
    public function siguiendoObj(){
        return $this->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido');
    }
    public function siguiendo(){
        return $this->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido')->select('usuario_seguido');
    }
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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
