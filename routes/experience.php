<?php
$router->get('/experiences', ['middleware' => 'auth', 'uses' => 'ExperienceController@getExperiences']);
$router->delete('/experiences/{id}', ['middleware' => 'auth', 'uses' => 'ExperienceController@deleteExperience']);
$router->post('/experiences', ['middleware' => 'auth', 'uses' => 'ExperienceController@addExperience']);
$router->put('/experiences/{id}', ['middleware' => 'auth', 'uses' => 'ExperienceController@updateExperience']);