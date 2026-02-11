import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        video: null,
        description: '',
    });

    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (file) => {
        if (file && file.type.startsWith('video/')) {
            setData('video', file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('videos.store'));
    };

    const removeVideo = () => {
        setData('video', null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <Head title="Upload - Shuvo-Tok" />

            <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
                {/* Animated background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                    <span className="text-white font-black text-xl">S</span>
                                </div>
                                <span className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                                    Shuvo-Tok
                                </span>
                            </Link>

                            <Link
                                href="/"
                                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Close</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="relative z-10 pt-24 pb-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Upload <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Video</span>
                            </h1>
                            <p className="text-gray-400 text-lg">Share your creativity with the world</p>
                        </div>

                        <form onSubmit={submit} className="grid md:grid-cols-2 gap-8">
                            {/* Left Side - Upload Area */}
                            <div className="order-2 md:order-1">
                                {!preview ? (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`
                                            relative cursor-pointer
                                            aspect-[9/16] rounded-3xl
                                            border-2 border-dashed transition-all duration-300
                                            flex flex-col items-center justify-center
                                            ${isDragging
                                                ? 'border-pink-500 bg-pink-500/10 scale-105'
                                                : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'}
                                        `}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="video/mp4,video/quicktime,video/webm"
                                            onChange={(e) => handleFileChange(e.target.files[0])}
                                            className="hidden"
                                        />

                                        <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>

                                            <p className="text-white font-bold text-xl mb-2">Drag & drop video</p>
                                            <p className="text-gray-400 mb-4">or click to browse</p>

                                            <div className="text-center text-sm text-gray-500">
                                                <p>MP4, MOV, or WebM</p>
                                                <p>Max 10 minutes • Up to 100MB</p>
                                            </div>
                                        </div>

                                        {/* Animated border gradient */}
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 hover:opacity-10 transition-opacity pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-black">
                                        <video
                                            src={preview}
                                            controls
                                            className="w-full h-full object-contain"
                                        />

                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={removeVideo}
                                            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 rounded-full text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        {/* Video info overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white font-medium truncate">{data.video?.name}</p>
                                            <p className="text-gray-400 text-sm">
                                                {(data.video?.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {errors.video && (
                                    <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                                        {errors.video}
                                    </div>
                                )}
                            </div>

                            {/* Right Side - Details */}
                            <div className="order-1 md:order-2 space-y-6">
                                {/* Description */}
                                <div>
                                    <label className="block text-white font-bold mb-3 text-lg">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe your video..."
                                            maxLength={500}
                                            rows={5}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                                        />
                                        <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
                                            {data.description.length}/500
                                        </div>
                                    </div>
                                    {errors.description && (
                                        <div className="mt-2 text-red-400 text-sm">{errors.description}</div>
                                    )}
                                </div>

                                {/* Upload Progress */}
                                {progress && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Uploading...</span>
                                            <span className="text-pink-400 font-bold">{progress.percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                                                style={{ width: `${progress.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Tips */}
                                <div className="p-5 bg-gray-800/30 border border-gray-700/50 rounded-2xl">
                                    <h3 className="text-white font-bold mb-3 flex items-center">
                                        <span className="mr-2">💡</span> Tips for great videos
                                    </h3>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                        <li className="flex items-start">
                                            <span className="text-pink-400 mr-2">•</span>
                                            Use vertical format (9:16) for best experience
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-400 mr-2">•</span>
                                            Add catchy descriptions with hashtags
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            Keep videos under 60 seconds for more views
                                        </li>
                                    </ul>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing || !data.video}
                                    className={`
                                        w-full py-4 px-8 rounded-2xl font-bold text-lg
                                        transition-all duration-300 transform
                                        ${data.video && !processing
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white hover:scale-[1.02] shadow-2xl shadow-pink-500/30'
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                                    `}
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Uploading...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Post Video
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
