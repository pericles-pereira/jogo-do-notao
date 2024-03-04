<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Models\Users\User;
use DateTimeImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Utils\Common\Str;
use Source\Helpers\Utils\Common\Toast;

class UserManagementController extends Controller
{
    public function create(): Response
    {
        $users = [];
        try {
            foreach (User::all() as $user) {
                $userArray = Str::snakeToCamel($user->toArray(), 'associative');
                $userArray['emailVerifiedAt'] = $userArray['emailVerifiedAt'] === null ? null : date_format(new DateTimeImmutable($userArray['emailVerifiedAt']), 'd/m/Y\ \a\t\ H:i');
                $userArray['createdAt'] = date_format(new DateTimeImmutable($userArray['createdAt']), 'd/m/Y\ \a\t\ H:i');
                $userArray['permissions'] = Str::snakeToCamel(array_diff_key($user->permission()->get()->toArray()[0], ['id' => null, 'created_at' => null, 'updated_at' => null, 'user_id' => null]), 'associative');
                $users[] = $userArray;
            }
        } catch (\Throwable $th) {
            return Redirect::route('users')->with('status', Toast::error('Erro no servidor! Usuário não encontrado.'));
        }

        return Page::render('Admin/Users/Management/Management', [
            'status' => session('status'),
            'users' => $users,
        ]);
    }

    public function show(int $id): Response | RedirectResponse
    {
        $user = User::whereId($id)->get();

        if (count($user) === 0) {
            return Redirect::route('users')->with('status', Toast::error('Usuário inexistente! Informe um ID válido como parâmetro.'));
        }

        try {
            $userArray = Str::snakeToCamel($user->toArray()[0], 'associative');
            $userArray['emailVerifiedAt'] = $userArray['emailVerifiedAt'] === null ? null : date_format(new DateTimeImmutable($userArray['emailVerifiedAt']), 'd/m/Y\ \a\t\ H:i');
            $userArray['createdAt'] = date_format(new DateTimeImmutable($userArray['createdAt']), 'd/m/Y\ \a\t\ H:i');
            $userArray['permissions'] = Str::snakeToCamel(array_diff_key($user->all()[0]->permission()->get()->toArray()[0], ['id' => null, 'created_at' => null, 'updated_at' => null, 'user_id' => null]), 'associative');
        } catch (\Throwable $th) {
            return Redirect::route('users')->with('status', Toast::error('Erro no servidor! Usuário não encontrado.' . $th->getMessage()));
        }

        return Page::render('Admin/Users/UserConfig/UserConfig', [
            'status' => session('status'),
            'user' => $userArray,
        ]);
    }
}
