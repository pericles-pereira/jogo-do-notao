<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate;

class AuthValidate
{
    public function handle(Request $request, Closure $next)
    {
        $pipeline = app()->make(\Illuminate\Pipeline\Pipeline::class);

        $middlewares = [
            Authenticate::class,
            ValidateSession::class,
        ];

        return $pipeline
            ->send($request)
            ->through($middlewares)
            ->then(function ($request) use ($next) {
                return $next($request);
            });
    }
}
