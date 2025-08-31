

// import BookingModal from './BookingModal';
// import PaymentModal from './PaymentModal';

import Payment from "./Payment";
import BookingModal from "./stays/BookingModal";
import EventBrowser from "./stays/EventBrowser";
import UserHeader from "./stays/UserHeader";
import UserNotifications from "../components/UserNotifications";

const UserPage = () => {
    const dummyEvent = { name: "Sample Event", date: new Date().toISOString(), price: 2500 };
    const dummyGuests = ["Guest 1", "Guest 2"];

    return (

        <>

            <div className="min-h-screen bg-gray-50">

                <UserHeader
                    currentView="browse"
                    onViewChange={() => { }}
                    searchTerm=""
                    onSearchChange={() => { }}
                />

                <main className="max-w-7xl mx-auto px-4 py-6">

                    {/* Notifications Section */}
                    <section className="mb-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <UserNotifications />
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Events</h2>
                        <EventBrowser events={[]} searchTerm="" onBookEvent={() => { }} />
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Book Your Event</h2>
                        <BookingModal
                            event={dummyEvent}
                            guests={dummyGuests}
                            isOpen={true}
                            onClose={() => { }}
                            onBookingComplete={() => { }}
                            onProceedToPayment={(event, guests) => {
                                console.log("Proceeding to payment with:", event, guests);
                                // TODO: Open payment modal or navigate to payment page
                            }}
                        />

                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Complete Payment</h2>
                        <Payment
                            event={dummyEvent}
                            guests={dummyGuests}
                            isOpen={true}
                            onClose={() => { }}
                            onPaymentComplete={() => { }}
                        />
                    </section>
                </main>
            </div>




        </>
    );
};

export default UserPage;
