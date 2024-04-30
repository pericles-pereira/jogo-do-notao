<?php

use App\Http\Controllers\Guest\RankingController;
use Illuminate\Support\Facades\Route;
use Source\Helpers\Controllers\Page;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/guest.php';

require __DIR__ . '/auth.php';

Route::get('ranking/{gameAcronym}', [RankingController::class, 'index'])->name('ranking');

