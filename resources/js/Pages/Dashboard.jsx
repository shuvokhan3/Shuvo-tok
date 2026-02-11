import VideoCard from '@/Components/VideoCard';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ videos }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Shuvo-Tok - For You" />

            {/* Full-screen dark background */}
            <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
                {/* Animated background particles */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />
                </div>

                {/* Navigation Bar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                    <span className="text-white font-black text-xl">S</span>
                                </div>
                                <span className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                                    Shuvo-Tok
                                </span>
                            </Link>

                            {/* Center Navigation */}
                            <div className="hidden md:flex items-center space-x-1">
                                <button className="px-6 py-2 text-white font-bold border-b-2 border-pink-500">
                                    For You
                                </button>
                                <button className="px-6 py-2 text-gray-400 hover:text-white font-bold transition-colors">
                                    Following
                                </button>
                                <button className="px-6 py-2 text-gray-400 hover:text-white font-bold transition-colors">
                                    Explore
                                </button>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href={route('videos.create')}
                                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="hidden sm:inline">Upload</span>
                                        </Link>

                                        <Link href={route('profile.edit')} className="relative group">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">
                                                    {auth.user.name.charAt(0)}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-6 py-2 text-white font-bold hover:text-pink-400 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="relative z-10 pt-24 pb-20">
                    <div className="max-w-lg mx-auto px-4">
                        {videos.data.length > 0 ? (
                            <div className="space-y-8">
                                {videos.data.map((video, index) => (
                                    <div
                                        key={video.id}
                                        className="animate-fadeInUp"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <VideoCard video={video} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black text-white mb-4">No videos yet!</h2>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">Be the first to share something amazing with the world.</p>
                                {auth?.user ? (
                                    <Link
                                        href={route('videos.create')}
                                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-pink-500/30"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Upload your first video</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-pink-500/30"
                                    >
                                        <span>Join Shuvo-Tok</span>
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Load More */}
                        {videos.next_page_url && (
                            <div className="text-center mt-12">
                                <Link
                                    href={videos.next_page_url}
                                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full transition-all duration-300 border border-gray-700"
                                >
                                    Load More
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-gray-800/50 md:hidden">
                    <div className="flex items-center justify-around h-16">
                        <Link href="/" className="flex flex-col items-center text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-xs mt-1">Home</span>
                        </Link>
                        <button className="flex flex-col items-center text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="text-xs mt-1">Discover</span>
                        </button>
                        {auth?.user && (
                            <Link href={route('videos.create')} className="relative -top-4">
                                <div className="w-14 h-10 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/50">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </Link>
                        )}
                        <button className="flex flex-col items-center text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-xs mt-1">Inbox</span>
                        </button>
                        <Link href={auth?.user ? route('profile.edit') : route('login')} className="flex flex-col items-center text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-xs mt-1">Me</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
