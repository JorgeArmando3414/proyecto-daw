<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param  string  $role
     * @return mixed
     */
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next, $rol): Response
    {

        if (auth()->check() && auth()->user()->rol === $rol) {
            return $next($request);
        }

        return redirect('/inicio');
    }
}
