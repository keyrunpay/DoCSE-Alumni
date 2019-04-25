<?php

$router->post('/upload', ['middleware' => 'auth', 'uses' => 'FileController@uploadFile']);
