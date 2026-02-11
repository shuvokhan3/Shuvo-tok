<?php

namespace App\Http\Controllers\Admin;

use App\Models\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContentApprovalController extends Controller
{
    public function index()
    {
        $videos = Video::with(['user:id,name,avatar_path'])
            ->whereIn('status', ['pending', 'approved', 'rejected'])
            ->latest()
            ->paginate(20);

        return inertia('Admin/ContentApproval/Index', [
            'videos' => $videos,
        ]);
    }

    public function approve(Video $video)
    {
        $video->update([
            'status' => 'approved',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
            'rejection_reason' => null,
        ]);

        return back()->with('message', 'Video approved successfully.');
    }

    public function reject(Request $request, Video $video)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $video->update([
            'status' => 'rejected',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
            'rejection_reason' => $request->reason,
        ]);

        return back()->with('message', 'Video rejected.');
    }
}
