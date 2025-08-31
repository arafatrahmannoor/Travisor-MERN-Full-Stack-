import React from 'react';

export default function EventCard({ event, onBook }) {
    const categoryColors = {
        adventure: 'bg-orange-100 text-orange-800',
        culture: 'bg-purple-100 text-purple-800',
        relaxation: 'bg-green-100 text-green-800',
        food: 'bg-red-100 text-red-800',
        nature: 'bg-emerald-100 text-emerald-800'
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-xs font-medium">{event.rating}</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

                <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-1">📍</span>
                    <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-1">📅</span>
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                    <span className="mr-1">⏰</span>
                    <span className="text-sm">{event.duration}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                        <span className="mr-1">👥</span>
                        <span className="text-sm">{event.availableSpots} spots left</span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-sky-600">${event.price}</div>
                        <div className="text-xs text-gray-500">per person</div>
                    </div>
                </div>

                <button
                    onClick={() => onBook(event)}
                    className="w-full mt-4 bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
