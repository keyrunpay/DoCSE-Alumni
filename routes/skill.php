<?php

$router->get('/skills', ['middleware' => 'auth', 'uses' => 'SkillController@getSkills']);
$router->delete('/skills/{id}', ['middleware' => 'auth', 'uses' => 'SkillController@deleteSkill']);
$router->post('/skills', ['middleware' => 'auth', 'uses' => 'SkillController@addSkill']);
$router->get('/skills/match/{query}', ['middleware' => 'auth', 'uses' => 'SkillController@getMatches']);