import { useForm, usePage } from '@inertiajs/react';

export default function CommentForm({ videoId }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!auth.user) return;

        post(route('videos.comments.store', videoId), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    if (!auth.user) {
        return <p className="text-sm text-gray-400">Log in to comment.</p>;
    }

    return (
        <form onSubmit={submit} className="flex items-center space-x-2 mt-3">
            <input
                type="text"
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                required
            />
            <button
                type="submit"
                disabled={processing || !data.content.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50"
            >
                Post
            </button>
        </form>
    );
}
