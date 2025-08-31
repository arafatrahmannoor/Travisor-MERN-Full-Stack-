const UserHeader = ({ currentView, onViewChange, searchTerm, onSearchChange }) => {
    return (
        <div>
            <header className="bg-white shadow-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sky-500 text-xl">📍</span>
                            <h1 className="text-2xl font-bold text-gray-900">TravelHub</h1>
                        </div>

                        {/* Navigation Buttons */}
                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={() => onViewChange('browse')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'browse'
                                        ? 'bg-sky-100 text-sky-700'
                                        : 'text-gray-600 hover:text-sky-600'
                                    }`}
                            >
                                Browse Events
                            </button>
                            <button
                                onClick={() => onViewChange('dashboard')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'dashboard'
                                        ? 'bg-sky-100 text-sky-700'
                                        : 'text-gray-600 hover:text-sky-600'
                                    }`}
                            >
                                My Bookings
                            </button>
                        </nav>

                        {/* Search Bar */}
                        {currentView === 'browse' && (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search destinations..."
                                        value={searchTerm}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {/* User Avatar */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">👤</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">John Doe</span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default UserHeader;