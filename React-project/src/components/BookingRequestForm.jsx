import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuthStore from '../store/useAuthStore';

const BookingRequestForm = ({ packageData, onClose }) => {
    const { token } = useAuthStore();
    const [formData, setFormData] = useState({
        packageId: packageData.id,
        packageTitle: packageData.title,
        packagePrice: packageData.price,
        guests: 1,
        checkInDate: '',
        checkOutDate: '',
        note: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // POST /api/requests - Create new booking request
            const response = await axios.post('http://localhost:5000/api/requests', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                Swal.fire({
                    title: 'Request Submitted!',
                    text: 'Your booking request has been sent to admin for approval.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                onClose();
            }
        } catch (error) {
            console.error('Error creating booking request:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to submit booking request',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Book {packageData.title}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Guests
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.guests}
                            onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            value={formData.checkInDate}
                            onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            value={formData.checkOutDate}
                            onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Special Requests (Optional)
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="3"
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingRequestForm;
