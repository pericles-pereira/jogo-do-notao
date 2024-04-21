<?php

use App\Http\Controllers\Api\Game\RequestUniversityHelpController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('request-university-help', [RequestUniversityHelpController::class, 'store'])->name('request-university-help');
Route::patch('request-university-help', [RequestUniversityHelpController::class, 'update'])->name('request-university-help.patch');
Route::get('request-university-help/waiting-response', [RequestUniversityHelpController::class, 'waitingResponse'])->name('request-university-help.waiting-response');
