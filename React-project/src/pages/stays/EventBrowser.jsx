import React, { useState } from 'react';
import EventCard from './EventCard';

export default function EventBrowser({ events, searchTerm, onBookEvent }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const categories = ['all', 'adventure', 'culture', 'relaxation', 'food', 'nature'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.price - b.price;
            case 'rating':
                return b.rating - a.rating;
            case 'date':
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            default:
                return 0;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Experiences</h1>
                <p className="text-gray-600">Find and book your next adventure from our curated collection</p>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-lg">⚙️</span>
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-sky-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-2 ml-auto">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {sortedEvents.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onBook={onBookEvent}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
