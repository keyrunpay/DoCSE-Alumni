<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function members()
    {
        return $this->belongsToMany('App\Member');
    }
}
