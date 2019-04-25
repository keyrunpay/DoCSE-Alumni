<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function experiences(){
        $this->hasMany('App\Experience');
    }
}
