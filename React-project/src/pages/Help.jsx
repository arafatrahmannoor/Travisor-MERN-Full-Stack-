import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

const Help = () => {


    const faqs = [
        {
            question: "What is Travisor and how does it work?",
            answer:
                "Travisor is a travel platform offering personalized travel guides, expert tips, and curated itineraries to help you plan unforgettable trips worldwide.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach us via the Contact page form, email at support@travisor.com, or call us at +1 (555) 123-4567 during business hours.",
        },
        {
            question: "Can I customize my travel itinerary?",
            answer:
                "Absolutely! Our platform offers personalized travel plans tailored to your preferences and interests.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards, PayPal, and other secure payment gateways.",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (

        <>
            <Helmet>
                <title>Help</title>
                <meta name="description" content="Get help and support for your Travisor experience." />
            </Helmet>

            <section>
                <div className="h-[650px] bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-fixed relative mt-0">

                    <div className="text-center pt-[100px]  text-white text-shadow-lg   text-shadow-10xl">
                        <h2 className="text-[80px] font-bold">
                        How Can We Help You?
                    </h2>
                        <p className="text-[20px] mt-2">
                        Find answers to common questions or reach out to our support team for personalized assistance.
                    </p>
                    </div>
                    
                    
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto max-w-4xl px-6 py-16">
                <h3 className="text-3xl font-semibold text-indigo-600 mb-12 text-center">
                    Frequently Asked Questions
                </h3>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left font-semibold text-indigo-600 text-xl focus:outline-none"
                            >
                                {faq.question}
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeIndex === index && (
                                <div className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Prompt */}
            <section className="bg-[#1C7EB7] text-white text-center py-16">
                <h3 className="text-4xl font-bold mb-6">Still Have Questions?</h3>
                <p className="max-w-xl mx-auto mb-8 text-lg md:text-xl">
                    Our friendly support team is here to help you. Reach out anytime!
                </p>
                <Link
                    to="/contact"
                    className="inline-block bg-white text-[#1C7EB7] font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition"
                >
                    Contact Support
                </Link>
            </section>


        </>
    );
};

export default Help;



{/*
    {user && (
                                <li className="relative">
                                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={() => showDropdown == "hidden" ? setShowDropdown("block") : setShowDropdown("hidden")}>{user.displayName ?? "User"} <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg></button>
                                    <div id="dropdownNavbar" className={`z-10 ${showDropdown} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-12`}>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                            <li>
                                                <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</NavLink>
                                            </li>
                                            <li>
                                                <button className="cursor-pointer hover:text-blue-700" onClick={() => handleLogout()}>Log out</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            )}
    
    */}


// 