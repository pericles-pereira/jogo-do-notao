<?php

namespace App\Http\Controllers\Admin\Users;

use Source\Helpers\Utils\Common\Toast;
use App\Http\Controllers\Controller;
use Source\Helpers\Controllers\Page;
use App\Models\Users\User;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Create;
use Source\Helpers\Utils\Common\Str;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Page::render('Admin/Users/Register/Register');
    }

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
            DB::transaction(function () use ($credentials, $request, $password) {
                $user = Create::user($credentials, Str::camelToSnake($request->permissions));

                VerifyEmail::$password = $password;

                event(new Registered($user));
            });
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Usuário não cadastrado.');
        }

        return Redirect::backSuccess("Usuário cadastrado.");
    }
}
