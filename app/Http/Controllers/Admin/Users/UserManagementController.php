<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Models\Groups\Group;
use App\Models\Users\User;
use DateTimeImmutable;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Str;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        $users = [];
        try {
            foreach (User::all() as $user) {
                $userArray = Str::snakeToCamel($user->toArray());
                $userArray['emailVerifiedAt'] = $userArray['emailVerifiedAt'] === null ? null : date_format(new DateTimeImmutable($userArray['emailVerifiedAt']), 'd/m/Y\ \à\s\ H:i');
                $userArray['createdAt'] = date_format(new DateTimeImmutable($userArray['createdAt']), 'd/m/Y\ \à\s\ H:i');
                $userArray['permissions'] = Str::snakeToCamel(array_diff_key($user->permission()->get()->toArray()[0], ['id' => null, 'created_at' => null, 'updated_at' => null, 'user_id' => null]));
                $userArray['group'] = $user->group->name;
                $users[] = $userArray;
            }
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Usuário não encontrado.');
        }

        return Page::render('Admin/Users/Management/Management', [
            'users' => $users,
        ]);
    }

    public function show(int $id): Response | RedirectResponse
    {
        $user = User::whereId($id)->get();

        try {
            if (count($user) === 0) {
                throw new \InvalidArgumentException('Usuário inexistente! Informe um ID válido como parâmetro.');
            }
        } catch (\InvalidArgumentException $e) {
            return Redirect::back($e, $e->getMessage());
        }

        try {
            $userArray = Str::snakeToCamel($user->toArray()[0]);
            $userArray['emailVerifiedAt'] = $userArray['emailVerifiedAt'] === null ? null : date_format(new DateTimeImmutable($userArray['emailVerifiedAt']), 'd/m/Y\ \à\s\ H:i');
            $userArray['createdAt'] = date_format(new DateTimeImmutable($userArray['createdAt']), 'd/m/Y\ \à\s\ H:i');
            $userArray['permissions'] = Str::snakeToCamel(array_diff_key($user->all()[0]->permission()->get()->toArray()[0], ['id' => null, 'created_at' => null, 'updated_at' => null, 'user_id' => null]));
            $userArray['group'] = Group::find($userArray['groupId'])->name;
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Usuário não encontrado.');
        }

        return Page::render('Admin/Users/Management/User/User', [
            'user' => $userArray,
        ]);
    }
}
