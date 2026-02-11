
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Index({ users }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user? This will also delete all their videos.')) {
            destroy(route('admin.users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manage Users
                </h2>
            }
        >
            <Head title="Manage Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash.message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{flash.message}</span>
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{flash.error}</span>
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Videos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600 overflow-hidden">
                                                            {user.avatar_path ? (
                                                                <img src={'/storage/' + user.avatar_path} alt="" className="h-full w-full object-cover" />
                                                            ) : (
                                                                user.name.charAt(0)
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                                        {user.is_admin === 1 && <span className="text-xs text-blue-500 font-bold">Admin</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.videos_count}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {!user.is_admin && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="text-red-600 hover:text-red-900 font-bold bg-red-100 px-3 py-1 rounded"
                                                    >
                                                        Delete / Ban
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
