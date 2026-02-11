<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class ViewController extends Controller
{
    public function store(Video $video)
    {
        // Increment view count
        $video->increment('views_count');
        
        return response()->json(['views' => $video->views_count]);
    }
}
