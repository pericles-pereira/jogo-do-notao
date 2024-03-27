<?php

namespace App\Providers;

use App\Models\Users\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('unregisteredCompany', fn (User $user) => $user->enterprise->cnpj === null);
        Gate::define('registeredCompany', fn (User $user) => $user->enterprise->cnpj !== null);
    }
}
