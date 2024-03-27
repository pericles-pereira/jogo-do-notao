<?php

namespace Source\Helpers\Controllers;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

final class Page
{
    public static function render(string $component, array | Arrayable $props = []): Response
    {
        $user = Auth::user();

        $permissions = array_map(fn (callable $func) => is_null($user) ? false : $func($user), Gate::abilities());

        $props['permissions'] = $permissions;

        if (!array_key_exists('status', $props)) {
            $props['status'] = session('status');
        }

        return Inertia::render($component, $props);
    }
}
