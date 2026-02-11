<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $admins = \App\Models\User::role(['super_admin', 'moderator'])
            ->with('roles')
            ->latest()
            ->get();

        return inertia('Admin/Admins/Index', [
            'admins' => $admins,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Admins/Create', [
            'availablePermissions' => \Spatie\Permission\Models\Permission::all()->pluck('name'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'permissions' => 'array', // Accept permissions array
        ]);

        $user = \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_admin' => true, 
            'email_verified_at' => now(),
        ]);

        // Assign a base role (e.g., moderator) to ensure they are considered "admin"
        // But rely on Direct Permissions for granular control
        $user->assignRole('moderator');
        
        // Sync selected permissions
        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        return redirect()->route('admin.admins.index')->with('message', 'Admin created successfully.');
    }
}
