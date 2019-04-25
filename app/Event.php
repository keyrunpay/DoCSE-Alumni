<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'title', 'start_date', 'end_date','img_url','body'
    ];

    public function going(){
        return $this->belongsToMany('App\Member')->wherePivot('say', 'Going');
    }

    public function notGoing(){
        return $this->belongsToMany('App\Member')->wherePivot('say', 'Not Going');
    }

    public function maybe(){
        return $this->belongsToMany('App\Member')->wherePivot('say', 'Maybe');
    }
}
