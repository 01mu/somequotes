<?php
/*
 * somequotes
 * github.com/01mu
 */

Route::get('/', function ()
{
    return view('index');
});

Route::group(['prefix' => 'api', 'middleware' => 'cors'], function ()
{
    Route::get('get_quotes_random/{limit}/{start}',
        'APIController@GetQuotesRandom');
    Route::get('get_author_search/{limit}/{start}/{query}',
        'APIController@GetAuthorSearch');
    Route::get('get_quotes_search/{limit}/{start}/{query}',
        'APIController@GetQuotesSearch');
    Route::get('get_author_search/{limit}/{start}',
        'APIController@LoadBlank');
    Route::get('get_quotes_search/{limit}/{start}',
        'APIController@LoadBlank');
    Route::get('get_author_single/{author}',
        'APIController@GetAuthorSingle');
});
