<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        \Spatie\Permission\Models\Permission::create(['name' => 'view_admin']);
        \Spatie\Permission\Models\Permission::create(['name' => 'manage_users']);
        \Spatie\Permission\Models\Permission::create(['name' => 'manage_videos']);
        \Spatie\Permission\Models\Permission::create(['name' => 'manage_admins']);
        \Spatie\Permission\Models\Permission::create(['name' => 'view_analytics']);

        // create roles and assign created permissions

        // Moderator
        $role = \Spatie\Permission\Models\Role::create(['name' => 'moderator']);
        $role->givePermissionTo(['view_admin', 'manage_videos']);

        // Super Admin
        $role = \Spatie\Permission\Models\Role::create(['name' => 'super_admin']);
        $role->givePermissionTo(\Spatie\Permission\Models\Permission::all());
    }
}
