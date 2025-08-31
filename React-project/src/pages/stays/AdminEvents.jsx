import { useNavigate } from "react-router";

const AdminEvents = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <button 
                        onClick={() => navigate("/admin")} 
                        className="text-sky-600 hover:text-sky-800 mb-4"
                    >
                        ← Back to Admin Panel
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
                    <p className="text-gray-600">Manage tourist attractions and events</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">All Events</h2>
                        <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                            Add New Event
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder event cards */}
                        <div className="border rounded-lg p-4">
                            <img src="/public/img/attraction/cox.png" alt="Cox's Bazar" className="w-full h-32 object-cover rounded mb-2" />
                            <h3 className="font-semibold">Cox's Bazar</h3>
                            <p className="text-gray-600 text-sm">Beautiful beach destination</p>
                            <div className="mt-2 flex justify-between">
                                <button className="text-sky-600 hover:text-sky-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                            <img src="/public/img/attraction/sajek.png" alt="Sajek Valley" className="w-full h-32 object-cover rounded mb-2" />
                            <h3 className="font-semibold">Sajek Valley</h3>
                            <p className="text-gray-600 text-sm">Mountain valley with clouds</p>
                            <div className="mt-2 flex justify-between">
                                <button className="text-sky-600 hover:text-sky-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                            <img src="/public/img/attraction/sundar.png" alt="Sundarbans" className="w-full h-32 object-cover rounded mb-2" />
                            <h3 className="font-semibold">Sundarbans</h3>
                            <p className="text-gray-600 text-sm">Largest mangrove forest</p>
                            <div className="mt-2 flex justify-between">
                                <button className="text-sky-600 hover:text-sky-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEvents;
