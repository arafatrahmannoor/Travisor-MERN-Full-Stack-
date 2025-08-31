import React from 'react';
import { Helmet } from 'react-helmet';

const Attractions = () => {
    return (
        <div>
            <Helmet>
                <title>Attractions</title>
                <meta name="description" content="Discover the top attractions we offer for your travel adventures." />
            </Helmet>
            <section >
                <div className="h-[650px] bg-[url('img/attraction/bangladesh-3673378.jpg')] bg-cover bg-fixed relative mt-0" >
                    <div className="text-center pt-[100px]  text-white text-shadow-lg   text-shadow-10xl">
                        <h2 className="text-[80px] font-bold">Attraction</h2>
                        <h4 className="text-[40px] mt-2">Discover Your Dream Vacation</h4>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Attractions in Bangladesh</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore travel destinations like never before</p>
                </div>
            </section>

            {/* REUSABLE ATTRACTION BLOCK */}
            {[
                {
                    title: "Cox's Bazer",
                    image: "img/attraction/cox.png",
                    description: `If you're looking for the most popular tourist places...`,
                    link: "/coxbazar"
                },
                {
                    title: "The Sundarban",
                    image: "img/attraction/sundar.png",
                    description: `The Sundarbans is the world's largest mangrove forest...`,
                    link: "/sundarban"
                },
                {
                    title: "Jaflong",
                    image: "img/attraction/Jaflong.png",
                    description: `Jaflong is known to be Bangladesh's tea capital...`,
                    link: "/jaflong"
                },
                {
                    title: "Sajek Valley",
                    image: "img/attraction/sajek.png",
                    description: `Sajek valley is located among a range of mountains...`,
                    link: "/sajek"
                },
                {
                    title: "Paharpur",
                    image: "img/attraction/pahar.png",
                    description: `Paharpur is a popular archaeological site...`,
                    link: "/paharpur"
                },
                {
                    title: "Tangaur Haur",
                    image: "img/attraction/Tangaur.png",
                    description: `Tanguar Haor is one of the largest natural water reservoirs...`,
                    link: "/tangaur"
                }
            ].map((item, index) => (
                <section key={index} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="w-full lg:w-1/2">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" 
                            />
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="w-16 h-1 bg-blue-600"></div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{item.title}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                            <a 
                                href={item.link} 
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Read More
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            ))}

            {/* FAVOURITE SPOTS */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Favourite Spots</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600">Discover the most beloved destinations</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { name: "Bagerhat", image: "img/attraction/bagerhat.png" },
                            { name: "Lalbagh Fort", image: "img/attraction/fort.png" },
                            { name: "Jaflong", image: "img/attraction/Jaflong.png" },
                            { name: "Bisana Kandi", image: "img/attraction/bisana.png" },
                            { name: "Rangamati", image: "img/attraction/rangamati.png" },
                            { name: "Sajek Valley", image: "img/attraction/sajek.png" },
                            { name: "Sonargaon", image: "img/attraction/sonargaon.png" },
                            { name: "Tangaur Haur", image: "img/attraction/Tangaur.png" }
                        ].map((spot, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <img 
                                        src={spot.image} 
                                        alt={spot.name} 
                                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h5 className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{spot.name}</h5>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h5 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{spot.name}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Attractions;