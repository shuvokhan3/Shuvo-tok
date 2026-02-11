
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, popularVideos, activeUsers }) {
    const { auth } = usePage().props;
    const permissions = auth.permissions || [];

    // Helper to check permission
    const can = (permission) => permissions.includes(permission) || permissions.includes('manage_admins'); // Super admin usually has all, but check directly

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Admin Dashboard
                    </h2>
                    <div className="space-x-4">
                        {permissions.includes('manage_videos') && (
                            <Link href={route('admin.videos.index')} className="text-blue-600 hover:text-blue-900 font-bold">
                                Manage Videos
                            </Link>
                        )}
                        {permissions.includes('manage_users') && (
                            <Link href={route('admin.users.index')} className="text-blue-600 hover:text-blue-900 font-bold">
                                Manage Users
                            </Link>
                        )}
                        {permissions.includes('manage_admins') && (
                            <Link href={route('admin.admins.index')} className="text-blue-600 hover:text-blue-900 font-bold">
                                Manage Admins &rarr;
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Total Users</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_users}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Total Videos</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_videos}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Total Likes</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_likes}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Total Comments</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_comments}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Popular Videos */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Most Viewed Videos</h3>
                            <ul className="space-y-4">
                                {popularVideos.map((video) => (
                                    <li key={video.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden mr-3">
                                                {video.thumbnail_path && <img src={'/storage/' + video.thumbnail_path} alt="" className="h-full w-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100 truncate w-48">{video.description || 'Untitled'}</p>
                                                <p className="text-xs text-gray-500">{video.user.name}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{video.views_count} views</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Active Users */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Content Creators</h3>
                            <ul className="space-y-4">
                                {activeUsers.map((user) => (
                                    <li key={user.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                                                {user.avatar_path ? (
                                                    <img src={'/storage/' + user.avatar_path} alt={user.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-sm font-bold text-gray-500">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{user.videos_count} videos</p>
                                            <p className="text-xs text-gray-500">{user.likes_count} likes</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
