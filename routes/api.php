<?php

use App\Http\Controllers\Api\Admin\Game\GameRecordsController;
use App\Http\Controllers\Api\Game\PlayingController;
use App\Http\Controllers\Api\Game\RankingController;
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

Route::get('get-game-records', [GameRecordsController::class, 'getGameRecords'])->name('get-game-records');



Route::post('request-university-help', [RequestUniversityHelpController::class, 'store'])->name('request-university-help');
Route::patch('request-university-help', [RequestUniversityHelpController::class, 'update'])->name('request-university-help.patch');
Route::get('request-university-help/waiting-response', [RequestUniversityHelpController::class, 'waitingResponse'])->name('request-university-help.waiting-response');

Route::patch('set-playing-attribute', [PlayingController::class, 'setPlayingAttribute'])->name('set-playing-attribute');

Route::post('set-question-response', [PlayingController::class, 'setQuestionResponse'])->name('set-question-response');

Route::get('get-finished-games/{gameAcronym}', [RankingController::class, 'getFinishedGames'])->name('get-finished-games');

Route::post('finish-game', [PlayingController::class, 'finishGame'])->name('finish-game');
