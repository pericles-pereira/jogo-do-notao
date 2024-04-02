<?php

use App\Http\Controllers\Admin\Questions\CategoryController;
use App\Http\Controllers\Admin\Questions\QuestionController;
use App\Http\Controllers\Admin\Users\EditUserController;
use App\Http\Controllers\Admin\Users\RegisteredUserController;
use App\Http\Controllers\Admin\Users\UserManagementController;
use Illuminate\Support\Facades\Route;

// Manage User Routes
Route::get('register', [RegisteredUserController::class, 'create'])->name('register')->can('master');
Route::post('register', [RegisteredUserController::class, 'store'])->can('master');

Route::get('users', [UserManagementController::class, 'index'])->name('users')->can('master');
Route::get('users/{id}', [UserManagementController::class, 'show'])->name('users.show')->can('master');

Route::patch('users/{id}/permissions', [EditUserController::class, 'permissions'])->name('user.permissions.patch')->can('master');
Route::patch('users/{id}/disable', [EditUserController::class, 'disable'])->name('user.disable.patch')->can('master');
Route::patch('users/{id}/activate', [EditUserController::class, 'activate'])->name('user.activate.patch')->can('master');
Route::delete('users/{id}/delete', [EditUserController::class, 'delete'])->name('user.delete')->can('master');

Route::get('category', [CategoryController::class, 'index'])->name('category');
Route::post('category', [CategoryController::class, 'store'])->name('category.store');
Route::patch('category', [CategoryController::class, 'update'])->name('category.update');
Route::delete('category', [CategoryController::class, 'delete'])->name('category.delete');

Route::get('questions', [QuestionController::class, 'index'])->name('questions');
Route::post('questions', [QuestionController::class, 'store'])->name('questions.store');
Route::patch('questions', [QuestionController::class, 'update'])->name('questions.update');
Route::delete('questions', [QuestionController::class, 'delete'])->name('questions.delete');
