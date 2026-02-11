import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VideoCard from '@/Components/VideoCard';
import { Head } from '@inertiajs/react';

export default function Show({ profileUser, videos }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {profileUser.name}
                </h2>
            }
        >
            <Head title={profileUser.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="mb-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center">
                        <div className="h-24 w-24 rounded-full bg-gray-300 flex-shrink-0 mr-6 overflow-hidden">
                            {profileUser.avatar_path ? (
                                <img src={'/storage/' + profileUser.avatar_path} alt={profileUser.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-4xl text-gray-500 font-bold bg-gray-200">
                                    {profileUser.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileUser.name}</h1>
                            {profileUser.bio && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{profileUser.bio}</p>
                            )}
                            <div className="mt-4 flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
                                <div><span className="font-bold text-gray-900 dark:text-gray-100">{profileUser.videos_count || 0}</span> Videos</div>
                                <div><span className="font-bold text-gray-900 dark:text-gray-100">{profileUser.likes_count || 0}</span> Likes</div>
                            </div>
                        </div>
                    </div>

                    {/* Videos Grid */}
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Videos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.data.length > 0 ? (
                            videos.data.map((video) => (
                                <VideoCard key={video.id} video={{ ...video, user: profileUser }} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                No videos uploaded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
