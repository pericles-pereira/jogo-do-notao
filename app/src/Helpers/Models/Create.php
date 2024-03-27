<?php

namespace Source\Helpers\Models;

use App\Models\Users\Permission;
use App\Models\Users\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

final class Create
{
    /**
     * Standardizes the correct way to generate a user in the system, users must only be generated using this method.
     * @param array $credentials The user's credentials, defined by the name, email and password keys.
     * @param array $permissions The access and modification permissions that this new user will have on the system.
     * @return App\Models\Users\User The generated user.
     * @throws \Throwable If any error occurs while creating the user.
     */
    public static function user(array $credentials, array $permissions): User
    {
        foreach ($permissions as $key => $value) {
            if (!in_array($key, Permission::getAllAvaliablePermissions(), true)) {
                throw new \InvalidArgumentException('User permission entered does not exist.');
            }

            if (!is_bool($value)) {
                throw new \InvalidArgumentException('The permissions array values ​​must be boolean.');
            }
        }

        if (Hash::isHashed($credentials['password'])) {
            throw new \InvalidArgumentException('The password will be converted to hash during user creation, enter the password without the hash.');
        }

        $user = DB::transaction(function () use ($credentials, $permissions): User {
            $user = Auth::user()->enterprise->users()->create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
            ]);

            $user->permission()->create($permissions);

            return $user;
        }, 5);


        return $user;
    }

    
}
