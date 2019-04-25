<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class OrganizationController extends Controller
{
    public function getMatches($query)
    {
        $query = str_replace("%20"," ", $query);
        return DB::select('SELECT * FROM organizations WHERE INSTR(name,?)', [$query]);
    }
}
