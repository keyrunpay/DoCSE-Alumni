<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'member_id', 'organization_id', 'position', 'years'
    ];

    public $timestamps = false;

    public function member(){
        return $this->belongsTo('App\Member');
    }

    public function organization(){
        return $this->belongsTo('App\Organization');
    }
}
