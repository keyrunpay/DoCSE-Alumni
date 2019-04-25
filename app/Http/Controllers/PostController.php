<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller {
    public function getLatest(){
        $posts = Post::withCount(['replies'])->with(['member'])->where([
            ['expires_at', '>', time()],
            ['pinned', '=', '0'],
        ])->orderBy('id', 'desc')->take(20)->get();

        foreach($posts as $post){
            $post->formatForResponse(Auth::user()->id);
        }

        return $posts;
    }

    public function getMyPosts(){
        $posts = Post::withCount(['replies'])->with(['member'])->where([
            ['member_id','=',Auth::user()->id]
        ])->orderBy('id', 'desc')->take(20)->get();

        foreach($posts as $post){
            $post->formatForSelf(Auth::user()->id);
        }

        return $posts;
    }

    public function getPinned(){
        $posts = Post::withCount(['replies'])->with(['member'])->where([
            ['expires_at', '>', time()],
            ['pinned', '=', '1'],
        ])->orderBy('id', 'desc')->get();

        foreach($posts as $post){
            $post->formatForResponse(Auth::user()->id);
        }

        return $posts;
    }

    public function get($id){
        $post = Post::withCount(['replies'])->with(['member'])->find($id);
        $post->formatForResponse(Auth::user()->id);
        return $post;
    }

    public function update($id, Request $request){
        $post = Post::find($id);
        $this->authorize('updatePost', $post);
        $post->update(['body' => $request->input('body')]);
        return array("message" => "Post updated successfully.");
    }

    public function insert(Request $request){
        if (!$request->input('pictures')){
            $this->validate($request, [
                'body' => 'required|min:10',
            ]);
        }

        $this->validate($request, [
            'expiry' => 'required',
            'post_type' => 'required|in:Normal,Important'
        ]);        

        $post = Post::create([
            'member_id' => Auth::user()->id,
            'body' => $request->input('body'),
            'pictures' => $request->input('pictures', ''),
            'expires_at' => time() + intval($request->input('expiry')),
            'pinned' => $request->input('pinned', '0')
        ]);

        $post->formatForResponse(Auth::user()->id);

        $post['message'] = "Post was created successfully.";

        return $post;
    }

    public function delete($id){
        $post = Post::find($id);
        $this->authorize('deletePost', $post);
        $post->delete();
        return array("message" => "Post deleted.");
    }

    public function replies($id){
        $replies = Post::find($id)->replies;

        $majorReplies = [];

        foreach($replies as $reply){
            $reply->formatForResponse(Auth::user()->id);
            if ($reply->reply_id == 0) {
                $majorReplies["{$reply->id}"] = new \stdClass;
                $majorReplies["{$reply->id}"]->reply = $reply;
                $majorReplies["{$reply->id}"]->nested = [];
            } else {
                $majorReplies["{$reply->reply_id}"]->nested[] = $reply;
            }
        }

        $res = [];

        foreach($majorReplies as $reply){
            $res[] = $reply;
        }

        return ($res);
    }
}
