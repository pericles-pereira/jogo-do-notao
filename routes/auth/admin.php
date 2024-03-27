<?php

use App\Http\Controllers\Admin\Questions\QuestionController;
use App\Http\Controllers\Admin\Users\EditUserController;
use App\Http\Controllers\Admin\Users\RegisteredUserController;
use App\Http\Controllers\Admin\Users\UserManagementController;
use Illuminate\Support\Facades\Route;

// Manage User Routes
Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('register', [RegisteredUserController::class, 'store']);

Route::get('users', [UserManagementController::class, 'index'])->name('users');
Route::get('users/{id}', [UserManagementController::class, 'show'])->name('users.show');

Route::patch('users/{id}/permissions', [EditUserController::class, 'permissions'])->name('user.permissions.patch');
Route::patch('users/{id}/disable', [EditUserController::class, 'disable'])->name('user.disable.patch');
Route::patch('users/{id}/activate', [EditUserController::class, 'activate'])->name('user.activate.patch');
Route::delete('users/{id}/delete', [EditUserController::class, 'delete'])->name('user.delete');

Route::get('questions', [QuestionController::class, 'index'])->name('questions');
