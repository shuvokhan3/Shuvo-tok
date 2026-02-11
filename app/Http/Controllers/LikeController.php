<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Request $request, \App\Models\Video $video)
    {
        $request->validate([
            'type' => 'required|in:like,love,haha,angry,sad',
        ]);

        $existingLike = $video->likes()->where('user_id', $request->user()->id)->first();

        if ($existingLike) {
            if ($existingLike->type === $request->type) {
                // Toggle off if clicking same reaction
                $existingLike->delete();
                return back();
            } else {
                // Change reaction type
                $existingLike->update(['type' => $request->type]);
                return back();
            }
        }

        $video->likes()->create([
            'user_id' => $request->user()->id,
            'type' => $request->type,
        ]);

        return back();
    }
}
