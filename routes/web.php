<?php

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

Route::get('/', function () {
    return view('index');
});

Route::get('/test', function () {
    return view('test');
});

Route::group(['prefix' => 'api', 'middleware' => 'cors'], function () {
    Route::get('get_quotes_random/{limit}/{start}',
        'APIController@GetQuotesRandom');
    Route::get('get_author_search/{limit}/{start}/{query}',
        'APIController@GetAuthorSearch');
    Route::get('get_quotes_search/{limit}/{start}/{query}',
        'APIController@GetQuotesSearch');
    Route::get('get_author_single/{author}',
        'APIController@GetAuthorSingle');
});
