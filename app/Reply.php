<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model {
    protected $dateFormat = 'U';

    protected $fillable = [
        'post_id','member_id','reply_id','body'
    ];

    public function formatForResponse($member_id){
        $this['isMine'] = ($member_id == $this['member_id']) ? true : false;
        $this['created_at_formatted'] = $this['created_at']->diffForHumans();
        unset($this['updated_at']);
        unset($this['created_at']);
    }

    function post(){
        return $this->belongsTo('App\Post');
    }
}
