<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Guest\PlayingController;
use App\Http\Controllers\Guest\RankingController;
use App\Http\Controllers\Guest\RoomCodeController;
use App\Http\Controllers\Guest\UniversityHelpCodeController;
use App\Http\Controllers\Guest\UniversityHelpController;
use Illuminate\Support\Facades\Route;
use Source\Helpers\Controllers\Page;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return to_route('home');
    });

    Route::get('home', function () {
        return Page::render('Guest/Home/Home');
    })->name('home');

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


    Route::get('university-help-code', [UniversityHelpCodeController::class, 'index'])->name('university-help-code');
    Route::post('university-help-code', [UniversityHelpCodeController::class, 'store'])->name('university-help-code.store');

    Route::get('university-help', [UniversityHelpController::class, 'index'])->name('university-help');
    Route::post('university-help', [UniversityHelpController::class, 'store'])->name('university-help.store');
});
