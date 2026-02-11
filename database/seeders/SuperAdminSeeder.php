<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@toktik.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole('super_admin');
        
        // Also give all permissions directly to ensure granular checks work for super admin too
        $admin->syncPermissions(\Spatie\Permission\Models\Permission::all());
    }
}
