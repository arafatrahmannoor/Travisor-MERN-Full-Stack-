import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const UserNotifications = () => {
    const { token } = useAuthStore();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // GET /api/requests/notifications/unread - Get unread notifications
    const fetchNotifications = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/requests/notifications/unread', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Ensure we always have an array
            const notificationData = response.data;
            if (Array.isArray(notificationData)) {
                setNotifications(notificationData);
            } else if (notificationData && Array.isArray(notificationData.notifications)) {
                setNotifications(notificationData.notifications);
            } else if (notificationData && Array.isArray(notificationData.data)) {
                setNotifications(notificationData.data);
            } else {
                setNotifications([]);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchNotifications();
            
            // Set up real-time polling for notifications (every 30 seconds)
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        } else {
            // If no token, set notifications to empty array and stop loading
            setNotifications([]);
            setLoading(false);
        }
    }, [token, fetchNotifications]);

    // PATCH /api/requests/:id/notifications/read - Mark notifications as read
    const markAsRead = async (requestId) => {
        try {
            await axios.patch(`http://localhost:5000/api/requests/${requestId}/notifications/read`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Remove from unread notifications
            setNotifications(prev => prev.filter(n => n._id !== requestId));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Handle payment navigation
    const handlePayment = (notification) => {
        // Store booking details for payment page
        localStorage.setItem('pendingPayment', JSON.stringify({
            requestId: notification._id,
            packageTitle: notification.packageTitle,
            packagePrice: notification.packagePrice,
            guests: notification.guests,
            checkInDate: notification.checkInDate,
            checkOutDate: notification.checkOutDate
        }));
        navigate('/payment');
    };

    if (loading) return <div>Loading notifications...</div>;

    if (!token) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <p className="text-gray-500">Notifications are available for registered users. Please log in with email and password to see booking notifications.</p>
            </div>
        );
    }

    // Ensure notifications is always an array
    const safeNotifications = Array.isArray(notifications) ? notifications : [];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            
            {/* Test Payment Button - Remove in production */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm mb-2">Testing: Simulate approved booking for payment test</p>
                <button
                    onClick={() => {
                        const testBooking = {
                            _id: 'test-booking-123',
                            packageTitle: 'Test Package - Single',
                            packagePrice: 399,
                            guests: 2,
                            checkInDate: new Date().toISOString(),
                            checkOutDate: new Date(Date.now() + 86400000).toISOString() // tomorrow
                        };
                        handlePayment(testBooking);
                    }}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                >
                    Test Payment Flow
                </button>
            </div>
            
            {safeNotifications.length === 0 ? (
                <p className="text-gray-500">No new notifications</p>
            ) : (
                <div className="space-y-2">
                    {safeNotifications.map((notification) => (
                        <div 
                            key={notification._id} 
                            className={`p-4 border rounded-lg ${
                                notification.status === 'approved' 
                                    ? 'bg-green-50 border-green-200' 
                                    : notification.status === 'rejected'
                                    ? 'bg-red-50 border-red-200'
                                    : 'bg-blue-50 border-blue-200'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className={`font-medium ${
                                        notification.status === 'approved' 
                                            ? 'text-green-900' 
                                            : notification.status === 'rejected'
                                            ? 'text-red-900'
                                            : 'text-blue-900'
                                    }`}>
                                        Booking Request {notification.status === 'approved' ? 'Approved' : notification.status === 'rejected' ? 'Rejected' : 'Updated'}
                                    </h4>
                                    <p className={`mt-1 ${
                                        notification.status === 'approved' 
                                            ? 'text-green-700' 
                                            : notification.status === 'rejected'
                                            ? 'text-red-700'
                                            : 'text-blue-700'
                                    }`}>
                                        Your request for "{notification.packageTitle}" has been{' '}
                                        <span className={`font-semibold ${
                                            notification.status === 'approved' ? 'text-green-600' : 
                                            notification.status === 'rejected' ? 'text-red-600' : 'text-blue-600'
                                        }`}>
                                            {notification.status}
                                        </span>
                                    </p>
                                    {notification.adminMessage && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            Message: {notification.adminMessage}
                                        </p>
                                    )}
                                    
                                    {/* Payment section for approved requests */}
                                    {notification.status === 'approved' && (
                                        <div className="mt-3 p-3 bg-white rounded border border-green-200">
                                            <p className="text-green-800 font-medium mb-2">
                                                🎉 Your booking is approved! Proceed to payment:
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Amount: <span className="font-semibold">${notification.packagePrice}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Guests: {notification.guests || 1}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handlePayment(notification)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Pay Now
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => markAsRead(notification._id)}
                                    className="ml-4 text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserNotifications;
