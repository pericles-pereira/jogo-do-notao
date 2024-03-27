<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    require __DIR__ . '/auth/admin.php';
    require __DIR__ . '/auth/auth.php';
    require __DIR__ . '/auth/dashboard.php';
    require __DIR__ . '/auth/profile.php';
});
