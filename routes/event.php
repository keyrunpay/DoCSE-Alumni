<?php
use App\Event;
use App\Member;
use Illuminate\Http\Request;

$router->get('/events/all', ['middleware' => 'auth', function (){
    return Event::withCount(['going', 'notGoing', 'maybe'])->get();
}]);

$router->get('/events/{id}', ['middleware' => 'auth', function ($id){
    return Event::withCount(['going', 'notGoing', 'maybe'])->find($id);
}]);

$router->get('/events', ['middleware' => 'auth', function (){
    return Event::withCount(['going', 'notGoing', 'maybe'])->take(5)->get();
}]);

$router->post('/events/{id}/attach', ['middleware' => 'auth', function ($id, Request $request){
    $this->validate($request, [
        'say'=>'required|in:Going,Not Going,Maybe'
    ]);

    Member::find(Auth::user()->id)->events()->syncWithoutDetaching([$id => ["say" => $request->input('say')]]);

    return [
        "message" => "Attached successfully."
    ];
}]);

