<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $dateFormat = 'U';

    protected $fillable = [
        'member_id', 'body', 'pictures', 'pinned', 'expires_at'
    ];

    public function formatForResponse($member_id){
        $this['created_at_formatted'] = $this['created_at']->format('M d, Y');
        $this['member_name'] = $this['member']->name;
        $this['member_type'] = $this['member']->type;
        $this['member_photo_url'] = $this['member']->photo_url;
        $this['isMine'] = ($member_id == $this['member_id']) ? true : false;
        unset($this['member']);
        unset($this['updated_at']);
        unset($this['created_at']);
        unset($this['expires_at']);
    }

    public function formatForSelf(){
        $this['created_at_formatted'] = $this['created_at']->format('M d, Y');
        $this['member_name'] = $this['member']->name;
        $this['member_type'] = $this['member']->type;
        $this['member_photo_url'] = $this['member']->photo_url;
        $this['isExpired'] = (time() > $this['expires_at']) ? true : false;
        unset($this['member']);
        unset($this['updated_at']);
        unset($this['created_at']);
        unset($this['expires_at']);
    }

    public function replies(){
        return $this->hasMany('App\Reply');
    }

    public function member(){
        return $this->belongsTo('App\Member');
    }
}
