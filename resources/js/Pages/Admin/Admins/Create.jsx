
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function Create({ availablePermissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        permissions: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.admins.store'));
    };

    const handlePermissionChange = (permission) => {
        if (data.permissions.includes(permission)) {
            setData('permissions', data.permissions.filter(p => p !== permission));
        } else {
            setData('permissions', [...data.permissions, permission]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Admin
                </h2>
            }
        >
            <Head title="Create Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>

                            <div className="mb-6">
                                <span className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                    Permissions
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                    {availablePermissions.map(permission => (
                                        <label key={permission} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value={permission}
                                                checked={data.permissions.includes(permission)}
                                                onChange={() => handlePermissionChange(permission)}
                                                className="form-checkbox h-5 w-5 text-blue-600"
                                            />
                                            <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                                                {permission.replace('_', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                            </div>


                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
