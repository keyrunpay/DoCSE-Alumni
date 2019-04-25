<?php

$router->post('/register', 'MemberController@doRegistration');
$router->post('/login', 'MemberController@doLogin');

$router->get('/profile/details',['middleware' => 'auth', 'uses' => 'MemberController@details']);
$router->put('/profile/details',['middleware' => 'auth', 'uses' => 'MemberController@updateDetails']);
