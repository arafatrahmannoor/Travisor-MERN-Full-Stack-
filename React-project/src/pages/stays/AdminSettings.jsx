import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

const AdminSettings = () => {
    const navigate = useNavigate();
    const { user, role } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle admin settings update
        console.log("Admin settings update:", data);
        // Add your admin settings logic here
    };

    return (
        <>
            <Helmet>
                <title>Admin Settings</title>
                <meta name="description" content="Manage admin settings and configurations." />
            </Helmet>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <button 
                            onClick={() => navigate("/admin")} 
                            className="text-sky-600 hover:text-sky-800 mb-4"
                        >
                            ← Back to Admin Panel
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Settings</h1>
                        <p className="text-gray-600">Manage system settings and configurations</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* General Settings */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent" 
                                        placeholder="Enter site name"
                                        defaultValue="Travisor"
                                        {...register("siteName", {
                                            required: "Site name is required"
                                        })} 
                                    />
                                    {errors.siteName && <span className="text-red-500 text-sm">{errors.siteName.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Email
                                    </label>
                                    <input 
                                        type="email" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent" 
                                        placeholder="admin@travisor.com"
                                        defaultValue="admin@travisor.com"
                                        {...register("contactEmail", {
                                            required: "Contact email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })} 
                                    />
                                    {errors.contactEmail && <span className="text-red-500 text-sm">{errors.contactEmail.message}</span>}
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                                >
                                    Save General Settings
                                </button>
                            </form>
                        </div>

                        {/* Admin Profile */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent" 
                                        defaultValue={user?.name || "Admin"}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" 
                                        value={role || "admin"}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Login
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" 
                                        value={new Date().toLocaleDateString()}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* System Settings */}
                        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">User Registrations</h3>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span className="text-sm text-gray-600">Allow new registrations</span>
                                    </div>
                                </div>
                                
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">Email Notifications</h3>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span className="text-sm text-gray-600">Send booking confirmations</span>
                                    </div>
                                </div>
                                
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-2">Maintenance Mode</h3>
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm text-gray-600">Enable maintenance mode</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSettings;
