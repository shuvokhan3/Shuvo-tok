<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = \App\Models\User::withCount('videos')
            ->latest()
            ->paginate(15);

        return inertia('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function destroy(\App\Models\User $user)
    {
        if ($user->is_admin) {
             return back()->with('error', 'Cannot delete an admin user.');
        }
        
        // Delete user videos (logic can be expanded to events/observers)
        foreach($user->videos as $video) {
             if ($video->file_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($video->file_path);
            }
             $video->delete();
        }

        $user->delete();

        return back()->with('message', 'User deleted successfully.');
    }
}
