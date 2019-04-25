<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model {
    protected $dateFormat = 'U';

    protected $fillable = [
        'email', 'password','verified','name','gender','type','photo_url','program','address','batch','country','passed_year','phone','reg_number','short_bio'
    ];

    protected $hidden = [
        'password'
    ];

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function skills()
    {
        return $this->belongsToMany('App\Skill');
    }

    public function experiences(){
        return $this->hasMany('App\Experience');
    }

    public function events(){
        return $this->belongsToMany('App\Event');
    }
}
