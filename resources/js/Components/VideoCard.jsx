import { Link, router } from '@inertiajs/react';
import ReactionButton from './ReactionButton';
import CommentForm from './CommentForm';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Global mute preference
let globalMutePreference = true;

export default function VideoCard({ video }) {
    const [showComments, setShowComments] = useState(false);
    const [viewCount, setViewCount] = useState(video.views_count || 0);
    const [isMuted, setIsMuted] = useState(globalMutePreference);
    const [isVisible, setIsVisible] = useState(false);
    const hasTrackedView = useRef(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const handleVolumeChange = () => {
        if (videoRef.current) {
            const currentMuted = videoRef.current.muted;
            setIsMuted(currentMuted);
            globalMutePreference = currentMuted;
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        const containerElement = containerRef.current;

        if (!videoElement || !containerElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.7);
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                        videoElement.muted = globalMutePreference;
                        setIsMuted(globalMutePreference);
                        videoElement.play().catch(() => { });
                    } else {
                        videoElement.pause();
                    }
                });
            },
            { threshold: [0.7], rootMargin: '0px' }
        );

        observer.observe(containerElement);
        return () => observer.disconnect();
    }, []);

    const handlePlay = () => {
        if (hasTrackedView.current) return;
        hasTrackedView.current = true;
        axios.post(route('videos.view', video.id))
            .then(res => setViewCount(res.data.views))
            .catch(() => { });
    };

    return (
        <div
            ref={containerRef}
            className={`
                relative bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                rounded-3xl overflow-hidden mb-8 
                shadow-2xl shadow-purple-500/20
                transform transition-all duration-500 ease-out
                ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
                hover:shadow-purple-500/40 hover:shadow-3xl
                border border-gray-700/50
            `}
        >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20 blur-xl -z-10 animate-pulse" />

            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-gradient-to-r from-gray-900/80 to-transparent backdrop-blur-sm">
                <Link href={route('users.show', video.user.id)} className="flex items-center group">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 group-hover:from-cyan-400 group-hover:to-pink-500 transition-all duration-300">
                            <div className="h-full w-full rounded-full overflow-hidden bg-gray-900">
                                {video.user.avatar_path ? (
                                    <img src={'/storage/' + video.user.avatar_path} alt={video.user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br from-purple-600 to-pink-500">
                                        {video.user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-300">
                            {video.user.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{new Date(video.created_at).toLocaleDateString()}</p>
                    </div>
                </Link>

                {/* Follow button */}
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-sm font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30">
                    Follow
                </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-[9/16] w-full max-h-[70vh] bg-black flex justify-center items-center overflow-hidden">
                <video
                    ref={videoRef}
                    src={'/storage/' + video.file_path}
                    controls
                    className="h-full w-auto max-w-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onPlay={handlePlay}
                    onVolumeChange={handleVolumeChange}
                />

                {/* Play indicator overlay */}
                {!isVisible && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            {video.description && (
                <div className="px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm leading-relaxed">{video.description}</p>
                </div>
            )}

            {/* Interactions Bar */}
            <div className="px-4 py-4 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
                <div className="flex items-center space-x-6">
                    <ReactionButton
                        video={video}
                        userReaction={video.user_reaction}
                        reactionCounts={video.reaction_counts}
                    />

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 ${showComments ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
                    >
                        <span className="text-2xl">💬</span>
                        <span className="font-bold">{video.comments?.length || 0}</span>
                    </button>

                    <div className="flex items-center space-x-2 text-gray-400">
                        <span className="text-2xl">👁️</span>
                        <span className="font-bold">{viewCount}</span>
                    </div>
                </div>

                {/* Share button */}
                <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            </div>

            {/* Comments Section */}
            <div className={`overflow-hidden transition-all duration-500 ease-out ${showComments ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 bg-gray-900/80 border-t border-gray-700/30">
                    <div className="text-gray-400 text-sm font-bold mb-3 mt-3">Comments</div>
                    {video.comments && video.comments.length > 0 ? (
                        <ul className="space-y-3 max-h-48 overflow-y-auto">
                            {video.comments.map((comment) => (
                                <li key={comment.id} className="flex items-start space-x-3 animate-fadeIn">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        {comment.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <span className="text-pink-400 font-bold text-sm">{comment.user?.name || 'User'}</span>
                                        <p className="text-gray-300 text-sm">{comment.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm italic">No comments yet. Be the first!</p>
                    )}
                    <div className="mt-4">
                        <CommentForm videoId={video.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
