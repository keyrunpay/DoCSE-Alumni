<?php

namespace App\Policies;

use App\Experience;

class ExperiencePolicy {
    public function updateExperience($payload, Experience $experience){
        return $payload->id === $experience->member_id;
    }

    public function deleteExperience($payload, Experience $experience){
        return $payload->id === $experience->member_id;
    }
}