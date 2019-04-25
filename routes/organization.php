<?php
$router->get('/organizations/match/{query}', ['middleware' => 'auth', 'uses' => 'OrganizationController@getMatches']);