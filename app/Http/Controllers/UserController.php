<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(\App\Models\User $user)
    {
        $user->loadCount(['videos', 'likes']);
        
        $videos = $user->videos()
            ->latest()
            ->paginate(12);

        return inertia('User/Show', [
            'profileUser' => $user,
            'videos' => $videos,
        ]);
    }
}
