<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UsersController;
/* GENERATOR(IMPORT) */

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
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/clear-data', function () {
        Artisan::call('migrate:fresh', [
            '--force' => true,
        ]);
        Artisan::call('db:seed', [
            '--class' => 'UserSeeder',
            '--force' => true,
        ]);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('/users', UserController::class)->except('create', 'edit');
    Route::put('/users/{model}/{relation}', [UserController::class, 'updateRelation']);

        Route::resource("/userss", UsersController::class)->parameters([
        "userss" => "entity"
    ])->except("create", "edit");
    Route::put("/userss/{entity}/{relation}", [UsersController::class, "updateRelation"]);

/* GENERATOR(ROUTE) */
});
