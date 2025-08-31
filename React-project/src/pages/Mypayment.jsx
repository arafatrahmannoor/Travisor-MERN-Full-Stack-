import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Mypayment = ({ event, guests = 1, isOpen, onClose, onPaymentComplete }) => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    if (!isOpen || !event) return null;

    const totalAmount = (event?.price || 0) * guests;

    const handleInputChange = (field, value) => {
        setPaymentDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsCompleted(true);

            setTimeout(() => {
                const bookingDetails = {
                    event,
                    guests,
                    totalAmount,
                    bookingDate: new Date().toISOString().split('T')[0],
                    status: 'confirmed',
                    paymentStatus: 'completed',
                };

                onPaymentComplete(bookingDetails);
                setIsCompleted(false);
                onClose();
            }, 2000);
        }, 3000);
    };

    if (isCompleted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
                    <div className="h-16 w-16 text-green-500 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 mb-4">
                        Your booking has been confirmed. You'll receive a confirmation email shortly.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-green-800 font-medium">{event?.title}</p>
                        <p className="text-green-600">
                            {guests} guest{guests > 1 ? 's' : ''} • ${totalAmount}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={isProcessing}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="mb-6 bg-gray-50 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{event?.title || 'Travel Package'}</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                            <span className="font-bold text-sky-600">${totalAmount}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Cardholder Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <input
                                type="text"
                                required
                                value={paymentDetails.cardholderName}
                                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={paymentDetails.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="1234 5678 9012 3456"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    required
                                    value={paymentDetails.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <input
                                    type="text"
                                    required
                                    value={paymentDetails.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                            <input
                                type="text"
                                required
                                value={paymentDetails.billingAddress}
                                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                placeholder="123 Main St, City, State 12345"
                            />
                        </div>

                        {/* Security Note */}
                        <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                            <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            Your payment information is encrypted and secure
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isProcessing}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="flex-1 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                        Processing...
                                    </div>
                                ) : (
                                    `Pay $${totalAmount}`
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Mypayment.propTypes = {
    event: PropTypes.object,
    guests: PropTypes.number,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPaymentComplete: PropTypes.func.isRequired,
};

export default Mypayment;
