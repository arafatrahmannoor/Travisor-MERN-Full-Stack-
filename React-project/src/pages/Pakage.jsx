import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../firebase";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import Swal from "sweetalert2";

const packagesData = {
    index: [
        {
            id: "single",
            title: "Single",
            description:
                "Perfect for solo travelers looking for adventure, safety & freedom.",
            icon: "https://img.icons8.com/ios/100/user--v1.png",
        },
        {
            id: "couple",
            title: "Couple",
            description:
                "Romantic getaways with private services and unforgettable memories.",
            icon: "https://images.icon-icons.com/154/PNG/512/couple_22013.png",
        },
        {
            id: "family",
            title: "Family",
            description: "Fun, safe, and inclusive packages for the whole family to enjoy.",
            icon: "https://img.icons8.com/ios/100/family--v1.png",
        },
        {
            id: "team",
            title: "Team",
            description:
                "Team retreats, group adventures, and corporate travel packages.",
            icon: "https://img.icons8.com/ios/100/conference-call--v1.png",
        },
    ],
    single: [
        {
            title: "Regular Package",
            price: 399,
            features: [
                "3 Days, 2 Nights Stay",
                "Standard Room Accommodation",
                "Basic Sightseeing Tour",
                "Daily Breakfast Included",
            ],
            borderColor: "border-blue-400",
            textColor: "text-blue-600",
            bgColor: "bg-blue-500",
            hoverBg: "hover:bg-blue-600",
        },
        {
            title: "Premium Package",
            price: 599,
            features: [
                "5 Days, 4 Nights Stay",
                "Luxury Hotel Room",
                "Full City Tour & Activities",
                "All Meals Included",
                "Airport Pickup & Drop",
            ],
            borderColor: "border-purple-400",
            textColor: "text-purple-600",
            bgColor: "bg-purple-500",
            hoverBg: "hover:bg-purple-600",
        },
    ],
    couple: [
        {
            title: "Regular Package",
            price: 749,
            features: [
                "4 Days, 3 Nights Stay",
                "Deluxe Room with Double Bed",
                "Local Sightseeing",
                "Welcome Drink & Breakfast",
            ],
            borderColor: "border-rose-400",
            textColor: "text-rose-600",
            bgColor: "bg-rose-500",
            hoverBg: "hover:bg-rose-600",
        },
        {
            title: "Premium Package",
            price: 999,
            features: [
                "6 Days, 5 Nights in Luxury Suite",
                "Candlelight Dinner & Couple Spa",
                "Private City Tour",
                "All Meals + Special Gifts",
                "Airport Transfer",
            ],
            borderColor: "border-pink-400",
            textColor: "text-pink-600",
            bgColor: "bg-pink-500",
            hoverBg: "hover:bg-pink-600",
        },
    ],
    family: [
        {
            title: "Regular Package",
            price: 899,
            features: [
                "5 Days, 4 Nights Stay",
                "Family Suite",
                "Complimentary Breakfast",
                "Theme Park Tickets",
                "Kid-Friendly Activities",
            ],
            borderColor: "border-yellow-400",
            textColor: "text-yellow-600",
            bgColor: "bg-yellow-500",
            hoverBg: "hover:bg-yellow-600",
        },
        {
            title: "Premium Package",
            price: 1299,
            features: [
                "7 Days, 6 Nights Stay",
                "Luxury Family Villa",
                "All Meals Included",
                "Theme Park + Zoo Access",
                "Personal Guide & Photos",
                "Private Airport Transfers",
            ],
            borderColor: "border-green-400",
            textColor: "text-green-600",
            bgColor: "bg-green-500",
            hoverBg: "hover:bg-green-600",
        },
    ],
    team: [
        {
            title: "Regular Package",
            price: 1099,
            features: [
                "6 Days, 5 Nights Stay",
                "Shared Group Accommodation",
                "Group Transportation",
                "Team Building Activities",
                "Guided Local Tours",
            ],
            borderColor: "border-blue-400",
            textColor: "text-blue-600",
            bgColor: "bg-blue-500",
            hoverBg: "hover:bg-blue-600",
        },
        {
            title: "Premium Package",
            price: 1599,
            features: [
                "9 Days, 8 Nights Stay",
                "Private Group Resort",
                "All-Inclusive Meals",
                "Corporate Team Events",
                "Evening Entertainment",
                "Airport Transfers Included",
            ],
            borderColor: "border-purple-400",
            textColor: "text-purple-600",
            bgColor: "bg-purple-500",
            hoverBg: "hover:bg-purple-600",
        },
    ],
};

function PackageCard({ pack, onBook }) {
    return (
        <div
            className={`bg-white  shadow-2xl rounded-2xl p-8 border-t-4 ${pack.borderColor}`}
        >
            <h2 className={`text-2xl font-bold ${pack.textColor} mb-4`}>{pack.title}</h2>
            <p className="text-lg font-semibold text-gray-700 mb-2">Price: ${pack.price}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
                {pack.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                ))}
            </ul>
            <button
                onClick={() => onBook(pack.title, pack.price)}
                className={`mt-6 text-white px-5 py-2 rounded-xl ${pack.bgColor} ${pack.hoverBg}`}
            >
                Book {pack.title}
            </button>
        </div>
    );
}
const Pakage = () => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const { isLoggedIn, token, setAuth } = useAuthStore();
    const navigate = useNavigate();

    // User is authenticated if either Firebase user exists OR Zustand store shows logged in
    const isAuthenticated = isLoggedIn || !!user;


    const [currentPage, setCurrentPage] = useState("index");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        travelDate: "",
        checkoutDate: "",
        guests: 1,
    });
    const [errors, setErrors] = useState({});

    const handleBookClick = (packTitle, packPrice) => {
        if (!isAuthenticated) {
            navigate("/login");  // Redirect to login if not authenticated
            return;
        }
        setSelectedPackage({ title: packTitle, price: packPrice, category: currentPage });
        setCurrentPage("booking");
    };

    const validateForm = () => {
        const errs = {};
        if (!formData.fullName.trim()) errs.fullName = "Name is required.";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email is required.";
        if (!formData.phone.trim()) errs.phone = "Phone is required.";
        if (!formData.travelDate) errs.travelDate = "Check-in date is required.";
        if (!formData.checkoutDate) errs.checkoutDate = "Check-out date is required.";
        
        // Validate that checkout date is after checkin date
        if (formData.travelDate && formData.checkoutDate) {
            const checkinDate = new Date(formData.travelDate);
            const checkoutDate = new Date(formData.checkoutDate);
            if (checkoutDate <= checkinDate) {
                errs.checkoutDate = "Check-out date must be after check-in date.";
            }
        }
        
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Enhanced authentication check
        if (!token && !user) {
            Swal.fire({
                title: 'Authentication Required',
                text: 'Please log in to submit a booking request.',
                icon: 'warning',
                confirmButtonText: 'Go to Login'
            }).then(() => {
                navigate('/login');
            });
            return;
        }

        try {
            console.log('=== BOOKING SUBMISSION DEBUG ===');
            console.log('Auth state - token exists:', !!token);
            console.log('Auth state - user exists:', !!user);
            console.log('User email:', user?.email);
            
            // Prepare booking data for API
            const bookingData = {
                packageId: selectedPackage?.category + "-" + selectedPackage?.title.toLowerCase().replace(/\s+/g, '-'),
                packageTitle: `${selectedPackage?.category} - ${selectedPackage?.title}`,
                packagePrice: selectedPackage?.price,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                checkInDate: formData.travelDate,
                checkOutDate: formData.checkoutDate,
                guests: formData.guests,
                note: `Package: ${selectedPackage?.category} - ${selectedPackage?.title}`
            };

            console.log('Submitting booking data:', bookingData);

            let response;
            
            // For manual login users, use token-based auth
            if (token) {
                console.log('Using token-based auth');
                response = await axios.post('http://localhost:5000/api/requests', bookingData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else if (user) {
                console.log('Using Google auth');
                // For Google auth users, send additional user info
                response = await axios.post('http://localhost:5000/api/requests', {
                    ...bookingData,
                    userEmail: user.email,
                    userName: user.displayName || formData.fullName,
                    authType: 'google'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            console.log('API Response:', response);

            if (response?.status === 201) {
                Swal.fire({
                    title: 'Booking Request Submitted!',
                    text: 'Your booking request has been sent to admin for approval.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Reset form after successful submission
                setFormData({ fullName: "", email: "", phone: "", travelDate: "", checkoutDate: "", guests: 1 });
                setSelectedPackage(null);
                setCurrentPage("index");
                setErrors({});
            } else {
                console.error('Unexpected response status:', response?.status);
                Swal.fire({
                    title: 'Unexpected Response',
                    text: 'Booking may not have been submitted properly. Please check with admin.',
                    icon: 'warning'
                });
            }

        } catch (error) {
            console.error('Error submitting booking:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                statusText: error.response?.statusText
            });
            
            let errorMessage = 'Failed to submit booking request. Please try again.';
            
            if (error.response?.status === 401) {
                console.error('Authentication failed - clearing auth state');
                // Clear invalid auth state
                setAuth({ token: null, role: null, user: null });
                errorMessage = 'Authentication failed. Please log in again.';
                
                Swal.fire({
                    title: 'Authentication Failed',
                    text: errorMessage,
                    icon: 'warning',
                    confirmButtonText: 'Go to Login'
                }).then(() => {
                    navigate('/login');
                });
                return;
            } else if (error.response?.status === 400) {
                errorMessage = error.response?.data?.message || 'Invalid booking data. Please check your information.';
            } else if (error.response?.status === 500) {
                errorMessage = 'Server error. Please try again later or contact support.';
            } else if (error.message.includes('Network Error')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }
            
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                footer: `Error details: ${error.response?.status || 'Network'} - ${error.response?.statusText || error.message}`
            });
        }
    };

    // Page Components
    const IndexPage = () => (
        <div id="index" className="page ">
            <header className="bg-[#197FB3] shadow-md py-10 mb-10">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-shadow-2xl text-4xl font-extrabold text-white">Pricing</h1>
                    <p className="text-lg text-white mt-1">
                        Modern Travel & Tourism Service Platform
                    </p>
                </div>
            </header>
            <main className="container mx-auto px-50 ">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">
                    Explore Our Travel Packages
                </h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                    {packagesData.index.map(pack => (
                        <div
                            key={pack.id}
                            onClick={() => {
                                if (!isAuthenticated) {
                                    navigate("/login");  // Redirect to login page if not authenticated
                                } else {
                                    setCurrentPage(pack.id);  // Proceed if logged in
                                }
                            }}
                            className="bg-white shadow-2xl rounded-2xl p-6 text-center hover:shadow-xl transition duration-300 cursor-pointer"
                        >
                            <img
                                src={pack.icon}
                                alt={pack.title}
                                className="mx-auto mb-4 h-20"
                            />
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">
                                {pack.title}
                            </h3>
                            <p className="text-gray-600">{pack.description}</p>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="mt-16 py-6 text-center text-sm text-gray-500">
                &copy; 2025 Travisor. All rights reserved.
            </footer>
        </div>
    );

    const PackageDetailsPage = () => (
        <div
            id={currentPage}
            className={`page bg-gradient-to-br from-white via-${currentPage === "single"
                ? "blue-50"
                : currentPage === "couple"
                    ? "pink-50"
                    : currentPage === "family"
                        ? "yellow-50"
                        : "blue-50"
                } to-${currentPage === "single"
                    ? "purple-50"
                    : currentPage === "couple"
                        ? "red-50"
                        : currentPage === "family"
                            ? "green-50"
                            : "purple-50"
                } min-h-screen`}
        >
            <header className="bg-white shadow-2xl py-6 mb-10 text-center">
                <h1
                    className={`text-3xl font-extrabold ${currentPage === "single"
                        ? "text-purple-600"
                        : currentPage === "couple"
                            ? "text-red-500"
                            : currentPage === "family"
                                ? "text-green-600"
                                : "text-purple-600"
                        }`}
                >
                    Travisor – {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Package
                </h1>
                <p className="text-md text-gray-500 mt-1">
                    {currentPage === "single"
                        ? "Solo trips with premium comfort and adventure"
                        : currentPage === "couple"
                            ? "Romantic getaways for two with curated experiences"
                            : currentPage === "family"
                                ? "Family adventures made fun and affordable"
                                : ""}
                </p>
            </header>
            <main className="container mx-auto px-6">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {(packagesData[currentPage] || []).map((pack, i) => (
                        <PackageCard key={i} pack={pack} onBook={handleBookClick} />
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <button
                        onClick={() => setCurrentPage("index")}
                        className={`text-${currentPage === "single"
                            ? "purple"
                            : currentPage === "couple"
                                ? "red"
                                : currentPage === "family"
                                    ? "green"
                                    : "purple"
                            }-500 hover:underline`}
                    >
                        ← Back to Packages
                    </button>
                </div>
            </main>
            <footer className="mt-16 py-6 text-center text-sm text-gray-500">
                &copy; 2025 Travisor. All rights reserved.
            </footer>
        </div>
    );

    const BookingPage = () => (
        <div
            id="booking"
            className="page bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen"
        >
            <header className="bg-white shadow-md py-6 mb-10 text-center">
                <h1 className="text-3xl font-extrabold text-blue-600">
                    Book Your Package
                </h1>
                <p className="text-md text-gray-500 mt-1">
                    Please fill out the form below to confirm your booking
                </p>
            </header>

            <main className="container mx-auto px-6 max-w-xl">
                <form
                    className="bg-white p-8 shadow-lg rounded-2xl border-t-4 border-blue-400 space-y-6"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-blue-500 ${errors.fullName ? "border-red-500" : ""
                                }`}
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={e =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            required
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-blue-500 ${errors.email ? "border-red-500" : ""
                                }`}
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={e =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-blue-500 ${errors.phone ? "border-red-500" : ""
                                }`}
                            placeholder="e.g. +8801234567890"
                            value={formData.phone}
                            onChange={e =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="selectedPackage"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Selected Package
                        </label>
                        <input
                            type="text"
                            id="selectedPackage"
                            className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            value={
                                selectedPackage
                                    ? `${selectedPackage.category.charAt(0).toUpperCase() +
                                    selectedPackage.category.slice(1)} – ${selectedPackage.title}`
                                    : ""
                            }
                            readOnly
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="guests"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Number of Guests
                        </label>
                        <input
                            type="number"
                            id="guests"
                            min="1"
                            max="10"
                            className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
                            value={formData.guests}
                            onChange={e =>
                                setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="travelDate"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            id="travelDate"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-blue-500 ${errors.travelDate ? "border-red-500" : ""
                                }`}
                            value={formData.travelDate}
                            onChange={e => {
                                const checkinDate = e.target.value;
                                setFormData({ ...formData, travelDate: checkinDate });
                                
                                // Auto-set checkout date to next day if it's empty or before checkin
                                if (!formData.checkoutDate || new Date(formData.checkoutDate) <= new Date(checkinDate)) {
                                    const nextDay = new Date(checkinDate);
                                    nextDay.setDate(nextDay.getDate() + 1);
                                    const nextDayString = nextDay.toISOString().split('T')[0];
                                    setFormData(prev => ({ ...prev, travelDate: checkinDate, checkoutDate: nextDayString }));
                                }
                            }}
                            required
                        />
                        {errors.travelDate && (
                            <p className="text-red-500 text-sm">{errors.travelDate}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="checkoutDate"
                            className="block text-gray-700 font-semibold mb-1"
                        >
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            id="checkoutDate"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-blue-500 ${errors.checkoutDate ? "border-red-500" : ""
                                }`}
                            value={formData.checkoutDate}
                            onChange={e =>
                                setFormData({ ...formData, checkoutDate: e.target.value })
                            }
                            min={formData.travelDate}
                            required
                        />
                        {errors.checkoutDate && (
                            <p className="text-red-500 text-sm">{errors.checkoutDate}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Confirm Booking
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        onClick={() => {
                            setCurrentPage("index");
                            setSelectedPackage(null);
                            setFormData({ fullName: "", email: "", phone: "", travelDate: "", checkoutDate: "", guests: 1 });
                            setErrors({});
                        }}
                        className="text-blue-500 hover:underline"
                    >
                        ← Back to Packages
                    </button>
                </div>
            </main>

            <footer className="mt-16 py-6 text-center text-sm text-gray-500">
                &copy; 2025 Travisor. All rights reserved.
            </footer>
        </div>
    );

    // Render pages based on currentPage
    if (currentPage === "index") return <IndexPage />;
    if (currentPage === "booking") return <BookingPage />;
    if (["single", "couple", "family", "team"].includes(currentPage))
        return <PackageDetailsPage />;

    return null;
}
export default Pakage;