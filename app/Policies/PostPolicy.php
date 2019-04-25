<?php

namespace App\Policies;

use App\Post;

class PostPolicy {
    public function updatePost($payload, Post $post){
        return $payload->id === $post->member_id;
    }

    public function deletePost($payload, Post $post){
        return $payload->id === $post->member_id;
    }
}