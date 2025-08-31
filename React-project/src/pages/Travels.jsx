
import React from 'react';
import { Helmet } from 'react-helmet';
import Filter from '../Filter';
import { Link } from 'react-router';

const Travels = () => {
    return (
        <div>
            <Helmet>
                <title>Travels</title>
                <meta name="description" content="Explore our travel packages and destinations to plan your next adventure." />
            </Helmet>
            <section >
                <div className="h-[650px] bg-[url('img/bgimg/ruslan-bardash-8MhejqEghLk-unspl.jpg')] bg-cover bg-fixed relative mt-0" id="at-text">
                    <div className="text-center pt-[150px]  text-white text-shadow-lg   text-shadow-10xl">
                        <h2 className="text-[70px] font-bold">Discover Your Next Adventure</h2>
                        <h4 className="text-[20px] mt-2">Explore curated travel packages designed to create unforgettable memories</h4>
                    </div>
                </div>
            </section>

            <Filter />

            {/* Package Cards */}
            <section>
                <div className="container mx-auto  max-w-6xl px-6 pb-20">
                    <h3 class="text-3xl font-semibold text-indigo-600 mb-10 px-6 py-12 ">Featured Travel Packages</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "Cox's Bazar",
                                img: "img/travel/package-1.jpg",
                                price: "$149.00"
                            },
                            {
                                title: "Indonesia",
                                img: "img/travel/package-2.jpg",
                                price: "$149.00"
                            },
                            {
                                title: "Thailand",
                                img: "img/travel/package-3.jpg",
                                price: "$149.00"
                            },
                            {
                                title: "Tokyo",
                                img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
                                price: "$1,500.00"
                            },
                            {
                                title: "Bangkok",
                                img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
                                price: "$149.00"
                            },

                            {
                                title: "Sundarban",
                                img: "img/attraction/sundar.png",
                                price: "$1,200.00"
                            },
                            {
                                title: "Jaflong",
                                img: "img/attraction/Jaflong.png",
                                price: "$149.00"
                            },
                            {
                                title: "Sajek Valley",
                                img: "img/attraction/sajek.png",
                                price: "$149.00"
                            }

                        ].map((pkg, idx) => (
                            <div key={idx} className="w-72 shadow-lg rounded-lg overflow-hidden">
                                <img src={pkg.img} alt={pkg.title} className="w-full h-48 object-cover" />
                                <div className="p-4 text-center">
                                    <h5 className="text-lg font-semibold"><i className="bi bi-geo-alt"></i> {pkg.title}</h5>
                                    <h5 className="text-md text-gray-600">{pkg.price}</h5>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </p>
                                    <a href="froms/payment.html" className="inline-block mt-4 mb-4 bg-indigo-600 text-white py-2 px-5 rounded font-semibold hover:bg-indigo-700 transition duration-200">Book Now</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#1C7EB7] text-white text-center py-16">
                <h3 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h3>
                <p className="max-w-xl mx-auto mb-8 text-lg md:text-xl">
                    Browse more travel packages or contact us for custom plans tailored to you.
                </p>
                <Link
                    to="/contact"
                    className="inline-block bg-white text-[#1C7EB7] font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition duration-200"
                >
                    Contact Us
                </Link>
            </section>
        </div>
    );
};

export default Travels;