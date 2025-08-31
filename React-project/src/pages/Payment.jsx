import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuthStore from '../store/useAuthStore';

const Payment = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        // Get booking data from localStorage (set by UserNotifications)
        const pendingPayment = localStorage.getItem('pendingPayment');
        if (pendingPayment) {
            setBookingData(JSON.parse(pendingPayment));
        } else {
            // Redirect to dashboard if no pending payment
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // PATCH /api/requests/:id/payment - Process payment
            const response = await axios.patch(
                `http://localhost:5000/api/requests/${bookingData.requestId}/payment`,
                {
                    paymentMethod: 'card',
                    paymentDetails: {
                        cardNumber: formData.cardNumber.slice(-4), // Only last 4 digits
                        billingAddress: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            address: formData.address,
                            city: formData.city,
                            country: formData.country,
                            zipCode: formData.zipCode
                        }
                    },
                    amount: bookingData.packagePrice
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                // Clear the pending payment data
                localStorage.removeItem('pendingPayment');
                
                Swal.fire({
                    title: 'Payment Successful!',
                    text: 'Your booking has been confirmed and payment processed.',
                    icon: 'success',
                    confirmButtonText: 'Go to Dashboard'
                }).then(() => {
                    navigate('/dashboard');
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
            Swal.fire({
                title: 'Payment Failed',
                text: error.response?.data?.message || 'Failed to process payment. Please try again.',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!bookingData) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <section>
                <Helmet>
                    <title>Payment</title>
                    <meta name="description" content="Secure your travel bookings with our easy payment options." />
                </Helmet>
            <div className="w-full">
                <div className="w-full flex justify-center mb-4 gap-10 pt-2">
                    
                    {/* Booking Summary */}
                    <div className="flex max-w-lg px-6 py-4 sm:px-8 rounded-2xl border border-gray-200 shadow-2xl bg-blue-50">
                        <div className="w-full">
                            <h4 className="mb-3 pb-4 pt-2 text-center text-lg font-semibold text-blue-800">
                                Booking Summary
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Package:</span>
                                    <span className="font-medium">{bookingData.packageTitle}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Guests:</span>
                                    <span className="font-medium">{bookingData.guests || 1}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-in:</span>
                                    <span className="font-medium">
                                        {bookingData.checkInDate ? new Date(bookingData.checkInDate).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-out:</span>
                                    <span className="font-medium">
                                        {bookingData.checkOutDate ? new Date(bookingData.checkOutDate).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between text-lg font-bold text-blue-800">
                                    <span>Total Amount:</span>
                                    <span>${bookingData.packagePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Form */}
                    <div className="flex max-w-lg px-6 py-1 sm:px-8 rounded-2xl border border-gray-200 shadow-2xl">
                        <div className="w-full flex ">
                            <div className="w-full">
                                <h4 className="mb-3 pb-4 pt-5 text-center text-lg font-semibold">
                                    Billing address
                                </h4>
                                <form onSubmit={handlePaymentSubmit} className="bg-white shadow-none rounded px-8 pt-2 pb-1 mb-4">
                                    <div className="w-full flex flex-wrap gap-4">
                                        <div className="w-full flex gap-5">
                                            <div className="w-full">
                                                <label for="firstName" className="block mb-1">
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                />
                                                <div className="text-red-500 text-sm hidden">
                                                    Valid first name is required.
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <label for="lastName" className="block mb-1">
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                />
                                                <div className="text-red-500 text-sm hidden">
                                                    Valid last name is required.
                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-full">
                                            <label for="email" className="block mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="you@example.com"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <div className="text-red-500 text-sm hidden">
                                                Please enter a valid email address for more updates.
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label for="address" className="block mb-1">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                required
                                                placeholder="1234 Main St"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            />
                                            <div className="text-red-500 text-sm hidden">
                                                Please enter your shipping address.
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label for="address2" className="block mb-1">
                                                Address 2{" "}
                                                <span className="text-gray-500">(Optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="address2"
                                                placeholder="Apartment or suite"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            />
                                        </div>
                                        <div className="w-full flex gap-2">


                                            <div className="w-1/2">
                                                <label for="country" className="block mb-1">
                                                    Country
                                                </label>
                                                <select
                                                    id="country"
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                >
                                                    <option value="">Choose...</option>
                                                    <option>Bangladesh</option>
                                                    <option>India</option>
                                                    <option>Japan</option>
                                                    <option>United States</option>
                                                </select>
                                                <div className="text-red-500 text-sm hidden">
                                                    Please select a valid country.
                                                </div>
                                            </div>

                                            <div className="w-1/2">
                                                <label for="state" className="block mb-1">
                                                    State
                                                </label>
                                                <select
                                                    id="state"
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                >
                                                    <option value="">Choose...</option>
                                                    <option>Dhaka</option>
                                                    <option>Bogura</option>
                                                    <option>California</option>
                                                </select>
                                                <div className="text-red-500 text-sm hidden">
                                                    Please provide a valid state.
                                                </div>
                                            </div>

                                            <div className="w-3/12">
                                                <label for="zip" className="block mb-1">
                                                    Zip
                                                </label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                />
                                                <div className="text-red-500 text-sm hidden">
                                                    Zip code required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <hr className="my-4 border-t" />

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="save-info"
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label for="save-info" className="text-sm">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="w-4/12 max-w-lg p-6 sm:p- rounded-2xl bg-white border border-gray-200 shadow-xl">
                        <form>
                            <hr className="my-4 border-t" />
                            <h4 className="mb-3 text-lg font-semibold">Payment</h4>

                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="credit"
                                        name="paymentMethod"
                                        checked
                                        required
                                        className="form-radio"
                                    />
                                    <label for="credit">Credit card</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="debit"
                                        name="paymentMethod"
                                        required
                                        className="form-radio"
                                    />
                                    <label for="debit">Debit card</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="paymentMethod"
                                        required
                                        className="form-radio"
                                    />
                                    <label for="paypal">PayPal</label>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap gap-2">

                                <div className="w-full flex gap-5">
                                    <div className="w-1/2">
                                        <label for="cc-name" className="block mb-1">
                                            Name on card
                                        </label>
                                        <input
                                            type="text"
                                            id="cc-name"
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <small className="text-gray-500">
                                            Full name as displayed on card
                                        </small>
                                        <div className="text-red-500 text-sm hidden">
                                            Name on card is required
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label for="cc-number" className="block mb-1">
                                            Credit card number
                                        </label>
                                        <input
                                            type="text"
                                            id="cc-number"
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <div className="text-red-500 text-sm hidden">
                                            Credit card number is required
                                        </div>
                                    </div>

                                </div>

                                <div className="w-full flex gap-5">
                                    <div className="w-1/4 ">
                                        <label for="cc-expiration" className="block mb-1">
                                            Expiration
                                        </label>
                                        <input
                                            type="text"
                                            id="cc-expiration"
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <div className="text-red-500 text-sm hidden">
                                            Expiration date required
                                        </div>
                                    </div>

                                    <div className="w-1/4">
                                        <label for="cc-cvv" className="block mb-1">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            id="cc-cvv"
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <div className="text-red-500 text-sm hidden">
                                            Security code required
                                        </div>
                                    </div>


                                </div>

                            </div>

                            <hr className="my-4 border-t" />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-80 py-3 rounded-md text-lg my-5 mx-15 ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                {loading ? 'Processing Payment...' : 'Complete Payment'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Payment;