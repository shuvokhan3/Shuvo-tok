<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        
        $videos = \App\Models\Video::with(['user:id,name,avatar_path', 'comments.user:id,name'])
            ->where('status', 'approved')
            ->withCount('likes as total_reactions')
            ->latest()
            ->paginate(10);

        // Attach user's own reaction and reaction counts for each video
        $videos->getCollection()->transform(function ($video) use ($userId) {
            // Get counts by type
            $video->reaction_counts = $video->likes()
                ->selectRaw('type, COUNT(*) as count')
                ->groupBy('type')
                ->pluck('count', 'type');
            
            // Get user's reaction if logged in
            $video->user_reaction = $userId 
                ? $video->likes()->where('user_id', $userId)->value('type') 
                : null;
            
            return $video;
        });
            
        return inertia('Dashboard', [
            'videos' => $videos,
        ]);
    }

    public function create()
    {
        return inertia('Videos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'video' => ['required', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'], // 50MB max
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $path = $request->file('video')->store('videos', 'public');

        $request->user()->videos()->create([
            'file_path' => $path,
            'description' => $request->description,
            'status' => 'pending',
        ]);

        return redirect()->route('dashboard');
    }
}
