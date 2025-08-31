import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuthStore from '../store/useAuthStore';

const PaymentSystem = () => {
    const { token } = useAuthStore();
    const [pendingPayments, setPendingPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // GET /api/purchases/pending - Get approved requests ready for payment
    useEffect(() => {
        const fetchPendingPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/purchases/pending', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPendingPayments(response.data || []);
            } catch (error) {
                console.error('Error fetching pending payments:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchPendingPayments();
        }
    }, [token]);

    // POST /api/purchases/initiate - Initiate payment process
    const initiatePayment = async (requestId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/purchases/initiate', {
                requestId: requestId,
                paymentMethod: 'card'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.paymentUrl) {
                // Redirect to payment gateway
                window.location.href = response.data.paymentUrl;
            } else {
                // For demo purposes, simulate successful payment
                await confirmPayment(requestId, 'demo_payment_' + Date.now());
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            Swal.fire({
                title: 'Payment Error',
                text: error.response?.data?.message || 'Failed to initiate payment',
                icon: 'error'
            });
        }
    };

    // POST /api/purchases/confirm - Confirm payment
    const confirmPayment = async (requestId, paymentId) => {
        try {
            const request = pendingPayments.find(p => p._id === requestId);
            
            const response = await axios.post('http://localhost:5000/api/purchases/confirm', {
                requestId: requestId,
                paymentId: paymentId,
                amount: request.packagePrice,
                paymentMethod: 'card',
                sessionId: 'demo_session_' + Date.now()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Payment Successful!',
                    text: 'Your booking has been confirmed. Check your dashboard for details.',
                    icon: 'success'
                });

                // Remove from pending payments
                setPendingPayments(prev => prev.filter(p => p._id !== requestId));
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            Swal.fire({
                title: 'Payment Confirmation Failed',
                text: error.response?.data?.message || 'Failed to confirm payment',
                icon: 'error'
            });
        }
    };

    // POST /api/purchases/cancel - Cancel payment
    const cancelPayment = async (requestId, reason = 'User cancelled') => {
        try {
            await axios.post('http://localhost:5000/api/purchases/cancel', {
                requestId: requestId,
                reason: reason
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                title: 'Payment Cancelled',
                text: 'Payment has been cancelled successfully.',
                icon: 'info'
            });

            // Remove from pending payments
            setPendingPayments(prev => prev.filter(p => p._id !== requestId));
        } catch (error) {
            console.error('Error cancelling payment:', error);
        }
    };

    if (loading) return <div>Loading pending payments...</div>;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Pending Payments</h3>
            
            {pendingPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No pending payments
                </div>
            ) : (
                <div className="space-y-4">
                    {pendingPayments.map((payment) => (
                        <div key={payment._id} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="text-lg font-medium text-gray-900">
                                        {payment.packageTitle}
                                    </h4>
                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                        <p>Check-in: {new Date(payment.checkInDate).toLocaleDateString()}</p>
                                        <p>Check-out: {new Date(payment.checkOutDate).toLocaleDateString()}</p>
                                        <p>Guests: {payment.guests}</p>
                                        <p>Status: <span className="text-green-600 font-medium">Approved</span></p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                        ${payment.packagePrice}
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <button
                                            onClick={() => initiatePayment(payment._id)}
                                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                        <button
                                            onClick={() => cancelPayment(payment._id)}
                                            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentSystem;
