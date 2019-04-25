<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Member;
use Illuminate\Support\Facades\DB;
use App\Skill;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class SkillController extends Controller
{    
    public function getSkills(){
        $skills = Member::find(Auth::user()->id)->skills;
        return $skills;
    }   

    public function getMatches($query)
    {
        $query = str_replace("%20", " ", $query);
        return DB::select('SELECT * FROM skills WHERE INSTR(name,?)', [$query]);
    }

    public function addSkill(Request $request){
        
        $this->validate($request, [
            'name' => 'required'
        ]);
            
        $skillName = trim($request->input('name'));

        $skill = Skill::where('name', $skillName)->first();
        if (!$skill){
            $skill = Skill::create($request->all());
        }

        $attachCount = count($skill->members()->syncWithoutDetaching(Auth::user()->id)['attached']);
        if ($attachCount < 1) abort(Response::HTTP_BAD_REQUEST);

        return array(
            "id" => $skill->id,
            "name" => $skill->name
        );
    }

    public function deleteSkill($id){
        Skill::find($id)->members()->detach(Auth::user()->id);
        return array(
            "message" => "Skill deleted."
        );
    }
}
