<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Models\Users\Permission;
use App\Models\Users\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Utils\Common\Str;

class EditUserController extends Controller
{
    public function permissions(Request $request, int $id): RedirectResponse
    {
        try {
            $avaliablePermissions = Str::snakeToCamel(Permission::getAllAvaliablePermissions(), 'indexed');
            $validate = [];

            foreach ($avaliablePermissions as $value) {
                $validate[$value] = 'required|boolean';
            }

            $request->validate($validate);

            $permission = User::find($id)->permission;
            $permission->fill(Str::camelToSnake($request->only($avaliablePermissions)));
            $permission->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, "Erro no servidor! Permissões não alteradas.");
        }

        return Redirect::backSuccess("Permissões alteradas.");
    }

    public function disable(int $id)
    {
        try {
            $user = User::find($id);

            $user->active = false;
            $user->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, "Erro no servidor! Usuário não encontrado.");
        }

        return Redirect::backSuccess("Usuário desativado.");
    }

    public function activate(int $id)
    {
        try {
            $user = User::find($id);

            $user->active = true;
            $user->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, "Erro no servidor! Usuário não encontrado.");
        }

        return Redirect::backSuccess("Usuário ativado.");
    }

    public function delete(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        try {
            if (Auth::user()->id === $id) {
                throw new \InvalidArgumentException('Um usuário não pode deletar ele mesmo.');
            }
        } catch (\InvalidArgumentException $e) {
            return Redirect::back($e, $e->getMessage());
        }

        try {
            $user = User::find($id);
            $user->delete();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Usuário não encontrado.');
        }

        return Redirect::backSuccess('Usuário deletado.');
    }
}
