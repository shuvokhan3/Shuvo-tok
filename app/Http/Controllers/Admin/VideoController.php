<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        $videos = \App\Models\Video::with('user')
            ->latest()
            ->paginate(15);

        return inertia('Admin/Videos/Index', [
            'videos' => $videos,
        ]);
    }

    public function destroy(\App\Models\Video $video)
    {
        // Optional: Delete file from storage
        if ($video->file_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($video->file_path);
        }
        if ($video->thumbnail_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($video->thumbnail_path);
        }

        $video->delete();

        return back()->with('message', 'Video deleted successfully.');
    }
}
