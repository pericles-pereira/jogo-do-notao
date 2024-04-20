<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Guest\PlayingController;
use App\Http\Controllers\Guest\RoomCodeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');



    Route::get('room-code', [RoomCodeController::class, 'index'])->name('room-code');
    Route::post('room-code', [RoomCodeController::class, 'store'])->name('room-code.store');

    Route::get('playing', [PlayingController::class, 'index'])->name('playing');
    Route::post('playing', [PlayingController::class, 'store'])->name('playing.store');
});
