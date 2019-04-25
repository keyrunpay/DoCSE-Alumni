<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Experience;
use App\Organization;

class ExperienceController extends Controller
{
    public function getExperiences()
    {
        $experiences = Experience::with(['organization'])->where([
            ['member_id', '=', Auth::user()->id]
        ])->get();

        foreach($experiences as $experience){
            unset($experience['member_id']);
            unset($experience['organization_id']);
            $experience['organization_name'] = $experience->organization->name;
            unset($experience['organization']);
        }

        return $experiences;
    }

    public function getMatches($query)
    {
        return DB::select('SELECT * FROM skills WHERE INSTR(name,?)', [$query]);
    }

    public function addExperience(Request $request)
    {
        $this->validate($request, [
            'organization_name' => 'required',
            'years' => 'required',
            'position' => 'required'
        ]);

        $organization = Organization::where('name', $request->input('organization_name'))->first();
        if (!$organization) {
            $organization = Organization::create([
                "name" => $request->input('organization_name')
            ]);
        }

        $experience = Experience::create([
            "member_id" => Auth::user()->id,
            "organization_id" => $organization->id,
            "position" => $request->input('position'),
            "years" => $request->input('years'),
        ]);

        unset($experience['member_id']);
        unset($experience['organization_id']);
        $experience['organization_name'] = $organization->name;
     
        return $experience;
    }

    public function deleteExperience($id)
    {
        $experience = Experience::find($id);
        $this->authorize('deleteExperience', $experience);

        $experience->delete();

        return array(
            "message" => "Experience deleted."
        );
    }

    public function updateExperience($id, Request $request){
        $this->validate($request, [
            'years' => 'required',
            'position' => 'required'
        ]);

        $experience = Experience::find($id);
        $this->authorize('updateExperience', $experience);
        
        $experience->update([
            "position" => $request->input('position'),
            "years" => $request->input('years')
        ]);

        return array(
            "message" => "Experience was updated."
        );
    }
}
