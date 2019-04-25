<?php
$router->get('/posts', ['middleware' => 'auth', 'uses' => 'PostController@getLatest']);
$router->get('/posts/mine', ['middleware' => 'auth', 'uses' => 'PostController@getMyPosts']);
$router->get('/posts/pinned', ['middleware' => 'auth', 'uses' => 'PostController@getPinned']);
$router->post('/posts', ['middleware' => 'auth', 'uses' => 'PostController@insert']);
$router->get('/posts/{id}', ['middleware' => 'auth', 'uses' => 'PostController@get']);
$router->put('/posts/{id}', ['middleware' => 'auth', 'uses' => 'PostController@update']);
$router->delete('/posts/{id}', ['middleware' => 'auth', 'uses' => 'PostController@delete']);
$router->get('/posts/{id}/replies', ['middleware' => 'auth', 'uses' => 'PostController@replies']);
