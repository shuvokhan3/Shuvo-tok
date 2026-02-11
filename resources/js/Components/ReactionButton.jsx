import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const reactionTypes = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'haha', emoji: '😂', label: 'Haha' },
    { type: 'angry', emoji: '😡', label: 'Angry' },
    { type: 'sad', emoji: '😢', label: 'Sad' },
];

export default function ReactionButton({ video, userReaction, reactionCounts }) {
    const [showPicker, setShowPicker] = useState(false);
    const [processing, setProcessing] = useState(false);
    const { auth } = usePage().props;

    const handleReaction = (type) => {
        if (!auth.user) {
            return;
        }
        setProcessing(true);
        router.post(route('videos.reactions.store', video.id), { type }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowPicker(false);
                setProcessing(false);
            },
            onError: () => setProcessing(false),
        });
    };

    // Find the current user's reaction emoji if any
    const currentReaction = reactionTypes.find(r => r.type === userReaction);
    const totalReactions = reactionCounts ? Object.values(reactionCounts).reduce((a, b) => a + b, 0) : 0;

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setShowPicker(!showPicker)}
                disabled={processing}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
                <span className="text-xl">{currentReaction ? currentReaction.emoji : '👍'}</span>
                <span className="text-sm font-medium">{totalReactions}</span>
            </button>

            {showPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex space-x-1 z-10">
                    {reactionTypes.map((reaction) => (
                        <button
                            key={reaction.type}
                            onClick={() => handleReaction(reaction.type)}
                            className={`text-2xl hover:scale-125 transition-transform p-1 rounded-full ${userReaction === reaction.type ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                            title={reaction.label}
                        >
                            {reaction.emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

