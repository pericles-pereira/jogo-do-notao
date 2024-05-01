<?php

use App\Http\Controllers\Admin\Game\GamesController;
use App\Http\Controllers\Admin\Game\StartGameController;
use App\Http\Controllers\Admin\Game\WatchGameController;
use App\Http\Controllers\Admin\Questions\CategoryController;
use App\Http\Controllers\Admin\Questions\QuestionController;
use App\Http\Controllers\Admin\Users\EditUserController;
use App\Http\Controllers\Admin\Users\RegisteredUserController;
use App\Http\Controllers\Admin\Users\UserManagementController;
use Illuminate\Support\Facades\Redirect;
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

Route::get('/', fn() => Redirect::route('game.manage'));

Route::post('game/start', [StartGameController::class, 'store'])->name('game.start.store');

Route::get('game/manage', [GamesController::class, 'index'])->name('game.manage');
Route::post('game/manage', [GamesController::class, 'store'])->name('game.manage.store');
Route::patch('game/manage', [GamesController::class, 'update'])->name('game.manage.update');
Route::delete('game/manage', [GamesController::class, 'delete'])->name('game.manage.delete');

Route::get('game/watch/{roomCode}', [WatchGameController::class, 'show'])->name('game.watch');

Route::delete('game/finish/{roomCode}', [StartGameController::class, 'delete'])->name('game.finish');
