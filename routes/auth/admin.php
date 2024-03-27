<?php

use App\Http\Controllers\Admin\Enterprise\Edit\EnterpriseCommonDataController;
use App\Http\Controllers\Admin\Enterprise\Edit\EnterpriseNfeDataController;
use App\Http\Controllers\Admin\Enterprise\Edit\EnterpriseTaxDataController;
use App\Http\Controllers\Admin\Enterprise\Register\EnterpriseRegisterController;
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



// Enterprise Routes
Route::get('enterprise/register', [EnterpriseRegisterController::class, 'create'])->can('unregisteredCompany')->name('enterprise.register.create');
Route::post('enterprise/register', [EnterpriseRegisterController::class, 'store'])->can('unregisteredCompany')->name('enterprise.register.store');

Route::get('enterprise/edit', [EnterpriseCommonDataController::class, 'edit'])->can('registeredCompany')->name('enterprise.common.edit');
Route::patch('enterprise/edit', [EnterpriseCommonDataController::class, 'update'])->can('registeredCompany')->name('enterprise.common.edit');

Route::get('enterprise/nfe/edit', [EnterpriseNfeDataController::class, 'edit'])->can('registeredCompany')->name('enterprise.nfe.edit');
Route::patch('enterprise/nfe/edit', [EnterpriseNfeDataController::class, 'update'])->can('registeredCompany')->name('enterprise.nfe.edit');

Route::get('enterprise/tax/edit', [EnterpriseTaxDataController::class, 'edit'])->can('registeredCompany')->name('enterprise.tax.edit');
Route::patch('enterprise/tax/edit', [EnterpriseTaxDataController::class, 'update'])->can('registeredCompany')->name('enterprise.tax.edit');
