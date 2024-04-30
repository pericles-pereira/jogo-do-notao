<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Source\Helpers\Utils\Common\Toast;
use Symfony\Component\HttpFoundation\Response;

class ValidateSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response | RedirectResponse
    {
        if (!Auth::user()->active) {

            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::route('home')->with('status', Toast::error('Acesso negado! Usuário desativado.'));
        }

        return $next($request);
    }
}
