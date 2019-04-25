<?php

namespace App\Http\Controllers;

use App\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReplyController extends Controller
{
    public function insert($id, Request $request)
    {   
        $this->validate($request, [
            'body' => 'required|min:1'
        ]);

        $reply = Reply::create([
            'post_id' => $id,
            'member_id' => Auth::user()->id,
            'body' => $request->input('body'),
            'reply_id' => $request->input('reply_id', '0'),
        ]);

        return $reply;
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'body' => 'required|min:1'
        ]);

        $reply = Reply::find($id);

        $this->authorize('updateReply', $reply);
        $reply->body = $request->input('body');
        $reply->save();

        return array("message" => "Reply updated successfully.");
    }

    public function delete($id)
    {
        $reply = Reply::find($id);

        $this->authorize('deleteReply', $reply);
        $reply->delete();
        
        return array("message" => "Reply deleted.");
    }
}
