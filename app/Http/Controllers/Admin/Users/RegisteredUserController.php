<?php

namespace App\Http\Controllers\Admin\Users;

use Source\Helpers\Utils\Common\Toast;
use App\Http\Controllers\Controller;
use Source\Helpers\Controllers\Page;
use App\Models\Users\User;
use App\Notifications\VerifyEmail;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Response;
use Source\Helpers\Models\Create;
use Source\Helpers\Utils\Common\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Page::render('Admin/Users/Register/Register', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'permissions' => 'required|array',
        ]);

        $password = Str::random(12);

        $credentials = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password,
        ];

        try {
            $user = Create::user($credentials, Str::camelToSnake($request->permissions, 'associative'));
        } catch (\Throwable $th) {
            return back()->with('status', Toast::error('Erro no servidor! Usuário não cadastrado.'));
        }

        VerifyEmail::$password = $password;

        event(new Registered($user));

        return back()->with('status', Toast::success("Usuário cadastrado."));;
    }
}
