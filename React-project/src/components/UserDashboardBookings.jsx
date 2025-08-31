import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import UserNotifications from './UserNotifications';
import PaymentSystem from './PaymentSystem';

const UserDashboardBookings = () => {
    const { token } = useAuthStore();
    const [dashboardData, setDashboardData] = useState({
        overview: {},
        activeBookings: [],
        pendingRequests: [],
        profile: {}
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch all dashboard data
                const [overviewRes, bookingsRes, pendingRes, profileRes] = await Promise.all([
                    // GET /api/dashboard/overview - Get dashboard overview with stats
                    axios.get('http://localhost:5000/api/dashboard/overview', { headers }),
                    
                    // GET /api/dashboard/bookings - Get user's active bookings
                    axios.get('http://localhost:5000/api/dashboard/bookings?status=paid,completed', { headers }),
                    
                    // GET /api/dashboard/pending-requests - Get pending requests
                    axios.get('http://localhost:5000/api/dashboard/pending-requests', { headers }),
                    
                    // GET /api/dashboard/profile - Get user profile with booking stats
                    axios.get('http://localhost:5000/api/dashboard/profile', { headers })
                ]);

                setDashboardData({
                    overview: overviewRes.data || {},
                    activeBookings: bookingsRes.data.bookings || bookingsRes.data || [],
                    pendingRequests: pendingRes.data || [],
                    profile: profileRes.data || {}
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDashboardData();
        }
    }, [token]);

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

    if (loading) {
        return <div className="text-center py-8">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                    <p className="text-gray-600">Manage your bookings and travel plans</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: 'overview', label: 'Overview' },
                                { key: 'bookings', label: 'My Bookings' },
                                { key: 'requests', label: 'Pending Requests' },
                                { key: 'payments', label: 'Payments' },
                                { key: 'notifications', label: 'Notifications' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.key
                                            ? 'border-sky-500 text-sky-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-blue-600">Total Bookings</h3>
                                    <p className="text-2xl font-bold text-blue-900">
                                        {dashboardData.overview.totalBookings || 0}
                                    </p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-green-600">Completed Trips</h3>
                                    <p className="text-2xl font-bold text-green-900">
                                        {dashboardData.overview.completedTrips || 0}
                                    </p>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-yellow-600">Pending Requests</h3>
                                    <p className="text-2xl font-bold text-yellow-900">
                                        {dashboardData.pendingRequests.length}
                                    </p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-purple-600">Total Spent</h3>
                                    <p className="text-2xl font-bold text-purple-900">
                                        ${dashboardData.overview.totalSpent || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold">My Bookings</h2>
                            
                            {dashboardData.activeBookings.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No active bookings
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {dashboardData.activeBookings.map((booking) => (
                                        <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {booking.packageTitle}
                                                    </h3>
                                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                        <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                                        <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                                        <p>Guests: {booking.guests}</p>
                                                        <p>Amount: ${booking.packagePrice}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {getStatusBadge(booking.status)}
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        Booked: {new Date(booking.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'requests' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold">Pending Requests</h2>
                            
                            {dashboardData.pendingRequests.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No pending requests
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {dashboardData.pendingRequests.map((request) => (
                                        <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {request.packageTitle}
                                                    </h3>
                                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                        <p>Check-in: {new Date(request.checkInDate).toLocaleDateString()}</p>
                                                        <p>Check-out: {new Date(request.checkOutDate).toLocaleDateString()}</p>
                                                        <p>Guests: {request.guests}</p>
                                                        <p>Amount: ${request.packagePrice}</p>
                                                        {request.note && <p>Note: {request.note}</p>}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {getStatusBadge(request.status)}
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        Requested: {new Date(request.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'payments' && <PaymentSystem />}

                    {activeTab === 'notifications' && <UserNotifications />}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardBookings;
