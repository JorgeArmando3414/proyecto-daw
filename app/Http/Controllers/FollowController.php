<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FollowController extends Controller
{
    public function follow(Request $request)
    {
        $userId = $request->input('userId');
        $user = auth()->user();
        $userToFollow = User::findOrFail($userId);
        $user->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido')->select('usuario_seguido')->attach($userToFollow->id,['created_at' => now(), 'updated_at' => now()]);

        return response()->json(['message' => 'User followed successfully.']);
    }

    public function unfollow(Request $request)
    {
        $userId = $request->input('userId');
        $user = auth()->user();
        $otroUser = User::find($userId);

        $user->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido')->select('usuario_seguido')->detach($otroUser->id);
        return response()->json(['message' => 'Unfollowed successfully'], 200);
    }

    public function seguidores($userId)
    {
        $user = User::findOrFail($userId);
        $followed = $user->belongsToMany(User::class, 'follows', 'usuario_seguido', 'usuario_siguiendo')->select('usuario_siguiendo')->get();
        return response()->json($followed);
    }

    public function siguiendo($userId)
    {
        $user = User::findOrFail($userId);
//        $following = $user->siguiendo()->get();
        $following = $user->belongsToMany(User::class, 'follows', 'usuario_siguiendo', 'usuario_seguido')->select('usuario_seguido')->get();

        return response()->json($following);
    }
}
