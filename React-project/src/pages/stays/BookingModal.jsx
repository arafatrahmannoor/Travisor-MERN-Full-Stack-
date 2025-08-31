import React, { useState } from 'react';

export default function BookingModal({
  event,
  isOpen,
  onClose,
  onProceedToPayment,
}) {
  const [guests, setGuests] = useState(1);
  if (!isOpen || !event) return null;

  const totalAmount = (event.price || 0) * guests;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Experience</h2>
          <button
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-xl">✖️</span>
          </button>
        </div>

        <div className="p-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-6"
          />

          <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📅</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⏰</span>
              <span>{event.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">👥</span>
              <span>{event.availableSpots} spots available</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-medium w-8 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(event.availableSpots || 1, guests + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  disabled={guests >= (event.availableSpots || 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price per person</span>
                <span className="font-medium">${event.price || 0}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">{guests}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-sky-600">
                  ${totalAmount}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onProceedToPayment(event, guests)}
                className="flex-1 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
