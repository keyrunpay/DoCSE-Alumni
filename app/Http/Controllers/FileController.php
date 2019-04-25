<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FileController extends Controller {
    public function uploadFile(Request $request){
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $file = $request->file('photo');

            $ext = $file->getClientOriginalExtension();
            $fName = $file->getClientOriginalName();

            $newFileName = str_replace('.'.$ext, "" , $fName).'-'.time().'.'.$ext;

            if (preg_match("/png|gif|jpg|jpeg/", $ext) && getimagesize($file)) {
                $uploaded = $file->move(str_replace('\\','/', __DIR__).'/../../../public/uploads', $newFileName);
                if ($uploaded){
                    $url = env('APP_URL').'uploads/'.$newFileName;
                    return [
                        "url" => $url
                    ];
                } else {
                    return response()->json([
                        "message" => "Internal server error."
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            } else {
                return response()->json([
                    "message" => "File type not supported."
                ], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response()->json([
                "message" => "Internal server error."
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
