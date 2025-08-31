import { useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuthStore from "../../store/useAuthStore";

const AdminBookings = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');

    // GET /api/admin/requests - Fetch all requests with filtering
    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                status: filter,
                page: 1,
                limit: 50,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            });
            
            if (searchTerm) {
                params.append('search', searchTerm);
            }

            console.log('Fetching admin requests with params:', params.toString());
            console.log('Admin token available:', !!token);

            const response = await axios.get(`http://localhost:5000/api/admin/requests?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Admin requests response:', response.data);
            
            const requestsData = response.data.requests || response.data || [];
            setRequests(requestsData);
            setError(null);
            
            console.log('Loaded requests count:', requestsData.length);
        } catch (error) {
            console.error('Error fetching requests:', error);
            console.error('Error details:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            setError('Failed to fetch booking requests');
        } finally {
            setLoading(false);
        }
    }, [token, filter, searchTerm]);

    useEffect(() => {
        if (token) {
            fetchRequests();
        }
    }, [fetchRequests, token]);

    // PATCH /api/admin/requests/:id/respond - Approve or reject request
    const handleRequestResponse = async (requestId, status, message = '') => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/admin/requests/${requestId}/respond`,
                {
                    status: status, // 'approved' or 'rejected'
                    message: message || `Your request has been ${status}!`
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: `Request ${status} successfully`,
                    icon: 'success'
                });
                fetchRequests(); // Refresh the list
            }
        } catch (error) {
            console.error('Error responding to request:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to update request',
                icon: 'error'
            });
        }
    };

    // View request details
    const handleViewDetails = (request) => {
        Swal.fire({
            title: 'Booking Request Details',
            html: `
                <div style="text-align: left;">
                    <p><strong>User:</strong> ${request.user?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${request.user?.email || request.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${request.phone || 'N/A'}</p>
                    <p><strong>Package:</strong> ${request.packageTitle || 'N/A'}</p>
                    <p><strong>Price:</strong> $${request.packagePrice || 'N/A'}</p>
                    <p><strong>Guests:</strong> ${request.guests || 1}</p>
                    <p><strong>Check-in:</strong> ${request.checkInDate ? new Date(request.checkInDate).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Check-out:</strong> ${request.checkOutDate ? new Date(request.checkOutDate).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Status:</strong> ${request.status || 'N/A'}</p>
                    <p><strong>Note:</strong> ${request.note || 'No additional notes'}</p>
                    <p><strong>Requested on:</strong> ${request.createdAt ? new Date(request.createdAt).toLocaleString() : 'N/A'}</p>
                </div>
            `,
            width: 600,
            showCancelButton: false,
            confirmButtonText: 'Close',
            confirmButtonColor: '#3085d6'
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            paid: 'bg-blue-100 text-blue-800',
            completed: 'bg-purple-100 text-purple-800'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <button 
                        onClick={() => navigate("/admin")} 
                        className="text-sky-600 hover:text-sky-800 mb-4"
                    >
                        ← Back to Admin Panel
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Booking Requests</h1>
                    <p className="text-gray-600">Manage user booking requests and approvals</p>
                    
                    {/* Debug Info */}
                    <div className="mt-2 text-sm text-gray-500">
                        Requests Count: {requests.length} | Filter: {filter} | Search: {searchTerm || 'none'} | Loading: {loading ? 'yes' : 'no'}
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="paid">Paid</option>
                                <option value="completed">Completed</option>
                                <option value="">All Requests</option>
                            </select>
                        </div>
                        
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by package, user name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>
                        
                        <div className="mt-6">
                            <button
                                onClick={fetchRequests}
                                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    {loading ? (
                        <div className="text-center py-8">Loading requests...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left">User</th>
                                        <th className="px-4 py-2 text-left">Package</th>
                                        <th className="px-4 py-2 text-left">Dates</th>
                                        <th className="px-4 py-2 text-left">Guests</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Created</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                <div>
                                                    <div className="font-medium">{request.user?.name || 'Unknown User'}</div>
                                                    <div className="text-sm text-gray-500">{request.user?.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="font-medium">{request.packageTitle}</div>
                                                <div className="text-sm text-gray-500">ID: {request.packageId}</div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="text-sm">
                                                    <div>In: {new Date(request.checkInDate).toLocaleDateString()}</div>
                                                    <div>Out: {new Date(request.checkOutDate).toLocaleDateString()}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">{request.guests}</td>
                                            <td className="px-4 py-2 font-medium">${request.packagePrice}</td>
                                            <td className="px-4 py-2">{getStatusBadge(request.status)}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex space-x-2">
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleRequestResponse(request._id, 'approved')}
                                                                className="text-green-600 hover:text-green-800 text-sm"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleRequestResponse(request._id, 'rejected')}
                                                                className="text-red-600 hover:text-red-800 text-sm"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleViewDetails(request)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {requests.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No booking requests found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
