<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('login','UsuarioController@login');

Route::get('nuevo', function () {
    return view('nuevo');
});

Route::get('principal', function () {
    return view('principal');
});

Route::get('compartidos', function () {
    return view('compartidos');
});

Route::get('perfil', function () {
    return view('perfil');
});

Route::post('registro','UsuarioController@guardar');
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
