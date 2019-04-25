<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Member;
use \Firebase\JWT\JWT;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller {

    public function details(){
        $member = Member::find(Auth::user()->id);
        $member['created_at_formatted'] = $member['created_at']->format('M d, Y');
        $member['updated_at_formatted'] = $member['updated_at']->diffForHumans();
        unset($member['created_at']);
        unset($member['updated_at']);
        return $member;
    }

    public function updateDetails(Request $request){
        $this->validate($request, [
            'program' => 'required|in:Computer Science,Computer Engineering'
        ]);
        $inputs = $request->all();
        $member = Member::find(Auth::user()->id);
        $member->update($inputs);
        
        return array(
            "message" => "Profile updated sucessfully."
        );
    }

    public function doRegistration(Request $req){
        $this->validate($req, [
            'name' => 'required',
            'email' => 'required|email|unique:members,email',
            'password' => 'required|string|min:6',
            'gender' => 'required|in:Male,Female',
            'type' => 'required|in:Student,Alumni,Faculty'
        ]);
        
        $inputs = $req->all();

        if ($req->input('gender') === "Male"){
            $inputs['photo_url'] = 'https://www.w3schools.com/w3images/avatar2.png';
        } else {
            $inputs['photo_url'] = 'hhttps://www.w3schools.com/howto/img_avatar2.png';
        }

        $inputs['password'] = hash("sha256", $inputs['password'].env('SALT'));

        $inputs['verified'] = 1;

        $newMember = Member::create($inputs);

        $newMember['message'] = "Registration was successful.";

        return $newMember;
    }

    public function doLogin(Request $req){
        $this->validate($req, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        $member = Member::where(['email' => $req->input('email'), 'password' => hash("sha256", $req->input('password') . env('SALT'))])->first();

        if ($member){
            $token = array(
                "id" => $member->id,
                "email" => $member->email,
                "iat" => time(),
            );

            $jwt = JWT::encode($token, env("APP_KEY"));

            return array(
                "message" => "Login successful",
                "id" => $member->id, 
                "email" => $member->email,
                "photo_url" => $member->photo_url,
                "isProfileUpdated" => (strlen($member->address) > 0) ? true : false,
                "token" => $jwt
            );
        } else {
            return response()->json([
                "message" => "Login failed"
            ])->setStatusCode(Response::HTTP_UNAUTHORIZED);
        }
    }
}
