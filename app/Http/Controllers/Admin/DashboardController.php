<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_videos' => \App\Models\Video::count(),
            'total_likes' => \App\Models\Like::count(),
            'total_comments' => \App\Models\Comment::count(),
        ];

        $popularVideos = \App\Models\Video::with('user:id,name,avatar_path')
            ->orderByDesc('views_count')
            ->take(5)
            ->get();
            
        $activeUsers = \App\Models\User::withCount(['videos', 'likes'])
            ->orderByDesc('videos_count')
            ->take(5)
            ->get();

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
            'popularVideos' => $popularVideos,
            'activeUsers' => $activeUsers,
        ]);
    }
}
