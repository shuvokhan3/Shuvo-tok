<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, \App\Models\Video $video)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $video->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return back();
    }
}
