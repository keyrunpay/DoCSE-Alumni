<?php
$router->post('/posts/{id}/reply', ['middleware' => 'auth', 'uses' => 'ReplyController@insert']);
$router->delete('/reply/{id}', ['middleware' => 'auth', 'uses' => 'ReplyController@delete']);
$router->put('/reply/{id}', ['middleware' => 'auth', 'uses' => 'ReplyController@update']);
