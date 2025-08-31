import useAuth from '../../hooks/useAuth';
import UserNotifications from '../../components/UserNotifications';

export default function Dashboard({ bookings = [] }) {
  // Get authentication information from both systems
  const { userName, userEmail } = useAuth();
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="text-green-500">✔️</span>;
      case "pending":
        return <span className="text-yellow-500">⏳</span>;
      case "cancelled":
        return <span className="text-red-500">❌</span>;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const upcomingTrips = bookings.filter((b) => new Date(b.event?.date) > new Date()).length;
  const recentActivity = bookings.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Here's what's happening with your travel plans</p>
          {userEmail && <p className="text-sm text-gray-500">{userEmail}</p>}
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <span>🔔</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <span>⚙️</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold">{totalBookings}</p>
            </div>
            <span className="bg-blue-400 bg-opacity-30 rounded-full p-3">📅</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="mr-1">⬆️</span>
            <span className="text-sm">+12% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Confirmed Trips</p>
              <p className="text-3xl font-bold">{confirmedBookings}</p>
            </div>
            <span className="bg-green-400 bg-opacity-30 rounded-full p-3">✔️</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="mr-1">🌍</span>
            <span className="text-sm">{upcomingTrips} upcoming</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Spent</p>
              <p className="text-3xl font-bold">৳{totalSpent.toLocaleString()}</p>
            </div>
            <span className="bg-purple-400 bg-opacity-30 rounded-full p-3">💵</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="mr-1">💳</span>
            <span className="text-sm">Avg ৳{Math.round(totalSpent / Math.max(totalBookings, 1))}/trip</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Travel Score</p>
              <p className="text-3xl font-bold">4.8</p>
            </div>
            <span className="bg-orange-400 bg-opacity-30 rounded-full p-3">⭐</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="mr-1">💫</span>
            <span className="text-sm">Excellent traveler</span>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <UserNotifications />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">View All</button>
          </div>

          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-3xl text-gray-300">📭</span>
              <p className="text-gray-500">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img
                    src={booking.event?.image}
                    alt={booking.event?.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.event?.title}</h3>
                    <p className="text-sm text-gray-600">{booking.event?.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(booking.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status?.charAt(0)?.toUpperCase() + booking.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">৳{booking.totalAmount}</p>
                    <p className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & Next Trip */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                <span>🌍 Browse New Events →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <span>📥 Download Itinerary →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <span>⭐ Leave Review →</span>
              </button>
            </div>
          </div>

          {/* Next Trip */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Next Trip</h2>
            {upcomingTrips > 0 ? (
              bookings
                .filter((b) => new Date(b.event?.date) > new Date())
                .slice(0, 1)
                .map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={booking.event.image}
                      alt={booking.event.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-gray-900 mb-1">{booking.event.title}</h3>
                    <p className="text-sm text-gray-600">📍 {booking.event.location}</p>
                    <p className="text-sm text-gray-600">📅 {new Date(booking.event.date).toLocaleDateString()}</p>
                    <div className="bg-sky-50 rounded-lg p-3 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-sky-700">Days remaining</span>
                        <span className="font-bold text-sky-600">
                          {Math.ceil((new Date(booking.event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-6">
                <span className="text-3xl text-gray-300">📭</span>
                <p className="text-gray-500 text-sm">No upcoming trips</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Bookings */}
      {bookings.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span>⚙️ Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span>📥 Export</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-48">
                    <img
                      src={booking.event.image}
                      alt={booking.event.title}
                      className="h-48 w-full md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.event.title}</h3>
                        <p className="text-sm text-gray-600">📍 {booking.event.location}</p>
                        <p className="text-sm text-gray-600">📅 {new Date(booking.event.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">⏰ {booking.event.duration}</p>
                        <p className="text-sm text-gray-600">👥 {booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-sky-600">৳{booking.totalAmount}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(booking.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status?.charAt(0)?.toUpperCase() + booking.status?.slice(1)}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            Payment {booking.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 text-sm text-gray-600 flex justify-between">
                      <span>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                      <span>Booking ID: {booking.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
