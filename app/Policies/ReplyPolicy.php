<?php

namespace App\Policies;

use App\Reply;

class ReplyPolicy {
    public function updateReply($payload, Reply $reply){
        return $payload->id === $reply->member_id;
    }

    public function deleteReply($payload, Reply $reply){
        return ($payload->id === $reply->member_id || $reply->post->member_id === $payload->id);
    }
}