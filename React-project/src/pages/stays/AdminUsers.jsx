import { useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuthStore from "../../store/useAuthStore";

const AdminUsers = () => {
    const navigate = useNavigate();
    const { token, role } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        provider: 'local',
        role: 'user'
    });

    const fetchUsers = useCallback(async () => {
        try {
            // Get JWT token from auth store first, then fallback to localStorage
            const authToken = token || localStorage.getItem('token') || localStorage.getItem('authToken');
            console.log("Auth store token:", token ? "Yes" : "No");
            console.log("LocalStorage token:", localStorage.getItem('token') ? "Yes" : "No");
            console.log("Final token used:", authToken ? "Yes" : "No");
            console.log("User role from store:", role);
            console.log("Making request to: http://localhost:5000/api/admin/users");
            
            if (!authToken) {
                setError("No authentication token found. Please login as admin.");
                setUsers([]);
                setLoading(false);
                return;
            }
            
            const res = await axios.get("http://localhost:5000/api/admin/users", { 
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                validateStatus: () => true 
            });
            
            console.log("Full response:", res);
            console.log("Response status:", res.status);
            console.log("Response data:", res.data);
            console.log("Response headers:", res.headers);
            
            if (res.status === 200) {
                let data = res.data;
                console.log("Processing data:", data);
                
                if (Array.isArray(data)) {
                    console.log("Data is array, length:", data.length);
                    const regularUsers = data.filter(user => user.role !== 'admin');
                    console.log("Regular users filtered:", regularUsers.length);
                    setUsers(regularUsers);
                } else if (data && Array.isArray(data.users)) {
                    console.log("Data.users is array, length:", data.users.length);
                    const regularUsers = data.users.filter(user => user.role !== 'admin');
                    console.log("Regular users filtered:", regularUsers.length);
                    setUsers(regularUsers);
                } else {
                    console.log("Data format not recognized:", typeof data);
                    setUsers([]);
                }
                setError(null);
            } else if (res.status === 401) {
                console.log("Unauthorized error");
                setError("Unauthorized. Please login as admin.");
                setUsers([]);
            } else if (res.status === 403) {
                console.log("Forbidden error");
                setError("Access denied. Admin role required.");
                setUsers([]);
            } else {
                console.log("Other error, status:", res.status, "data:", res.data);
                setError(`Backend error (${res.status}): ${res.data?.message || 'Unknown error'}`);
                setUsers([]);
            }
        } catch (error) {
            console.error("Detailed error information:");
            console.error("Error message:", error.message);
            console.error("Error code:", error.code);
            console.error("Error response:", error.response);
            console.error("Full error:", error);
            
            if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
                setError("Cannot connect to backend server. Make sure your server is running on http://localhost:5000");
            } else if (error.code === 'ERR_NETWORK') {
                setError("Network error. Check if backend server is running and CORS is configured.");
            } else {
                setError(`Connection error: ${error.message}`);
            }
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [token, role]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            console.log("Adding user with data:", formData);
            const token = localStorage.getItem('token') || localStorage.getItem('authToken');
            
            const res = await axios.post("http://localhost:5000/api/admin/users", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            }, { 
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                validateStatus: () => true 
            });
            
            console.log("Add user response:", res);
            if (res.status === 200 || res.status === 201) {
                Swal.fire('Success!', 'User added successfully', 'success');
                setShowAddModal(false);
                setFormData({ name: '', email: '', password: '', provider: 'local', role: 'user' });
                fetchUsers(); // Refresh the list
            } else if (res.status === 401) {
                Swal.fire('Error!', 'Unauthorized. Please login as admin.', 'error');
            } else if (res.status === 403) {
                Swal.fire('Error!', 'Access denied. Admin role required.', 'error');
            } else {
                throw new Error(res.data?.message || `Server returned status ${res.status}`);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            console.error("Error response:", error.response);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add user';
            Swal.fire('Error!', errorMessage, 'error');
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            console.log("Editing user with data:", formData);
            const token = localStorage.getItem('token') || localStorage.getItem('authToken');
            
            const updateData = {
                name: formData.name,
                email: formData.email,
                role: formData.role
            };
            // Only include password if it's provided
            if (formData.password.trim()) {
                updateData.password = formData.password;
            }
            
            const res = await axios.put(`http://localhost:5000/api/admin/users/${selectedUser._id}`, updateData, { 
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                validateStatus: () => true 
            });
            console.log("Edit user response:", res);
            if (res.status === 200) {
                Swal.fire('Success!', 'User updated successfully', 'success');
                setShowEditModal(false);
                setSelectedUser(null);
                setFormData({ name: '', email: '', password: '', provider: 'local', role: 'user' });
                fetchUsers(); // Refresh the list
            } else if (res.status === 401) {
                Swal.fire('Error!', 'Unauthorized. Please login as admin.', 'error');
            } else if (res.status === 403) {
                Swal.fire('Error!', 'Access denied. Admin role required.', 'error');
            } else {
                throw new Error(res.data?.message || `Server returned status ${res.status}`);
            }
        } catch (error) {
            console.error("Error editing user:", error);
            console.error("Error response:", error.response);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update user';
            Swal.fire('Error!', errorMessage, 'error');
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${userName}? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                console.log("Deleting user with ID:", userId);
                const token = localStorage.getItem('token') || localStorage.getItem('authToken');
                
                const res = await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    validateStatus: () => true 
                });
                console.log("Delete user response:", res);
                if (res.status === 200) {
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    fetchUsers(); // Refresh the list
                } else if (res.status === 401) {
                    Swal.fire('Error!', 'Unauthorized. Please login as admin.', 'error');
                } else if (res.status === 403) {
                    Swal.fire('Error!', 'Access denied. Admin role required.', 'error');
                } else {
                    throw new Error(res.data?.message || `Server returned status ${res.status}`);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                console.error("Error response:", error.response);
                const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
                Swal.fire('Error!', errorMessage, 'error');
            }
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '', // Don't pre-fill password
            provider: user.provider,
            role: user.role
        });
        setShowEditModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', provider: 'local', role: 'user' });
    };

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
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-600">Manage all regular users (excluding admins)</p>
                </div>

                {/* Summary Stats */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Regular Users</h3>
                            <p className="text-3xl font-bold text-sky-600">{users.length}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Users with History</h3>
                            <p className="text-3xl font-bold text-green-600">{users.filter(u => u.history && u.history.length > 0).length}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">New Users Today</h3>
                            <p className="text-3xl font-bold text-purple-600">
                                {users.filter(u => {
                                    const today = new Date().toDateString();
                                    const userDate = new Date(u.createdAt).toDateString();
                                    return today === userDate;
                                }).length}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Regular Users (Excluding Admins)</h2>
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
                        >
                            Add New User
                        </button>
                    </div>
                    {loading ? (
                        <div className="text-center py-8">Loading users...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Provider</th>
                                        <th className="px-4 py-2 text-left">Created Date</th>
                                        <th className="px-4 py-2 text-left">History</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${user.provider === 'google' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {user.provider}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {/* Show user history with proper formatting */}
                                                {user.history && user.history.length > 0 ? (
                                                    <div className="max-w-xs">
                                                        {user.history.map((historyItem, idx) => (
                                                            <div key={idx} className="mb-2 p-2 bg-gray-50 rounded-sm text-xs">
                                                                <div className="font-medium text-sky-600">{historyItem.type}</div>
                                                                <div className="text-gray-700">{historyItem.details}</div>
                                                                <div className="text-gray-500 text-xs">{new Date(historyItem.date).toLocaleDateString()}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">No history</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button 
                                                    onClick={() => openEditModal(user)}
                                                    className="text-sky-600 hover:text-sky-800 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user._id, user.name)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                                <select
                                    value={formData.provider}
                                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="local">Local</option>
                                    <option value="google">Google</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                                >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit User</h3>
                        <form onSubmit={handleEditUser}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password (Leave empty to keep current)</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter new password or leave empty"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                                <select
                                    value={formData.provider}
                                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="local">Local</option>
                                    <option value="google">Google</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                                >
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
