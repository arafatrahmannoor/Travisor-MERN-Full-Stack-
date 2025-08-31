import React from 'react';
import { Helmet } from 'react-helmet';
import Pakage from '../Pakage';

const Sajek = () => {
    return (
        <div>
            <Helmet>
                <title>Sajek</title>
                <meta name="description" content="Discover Sajek Valley, a picturesque hill station in Bangladesh known for its stunning landscapes and vibrant culture." />
            </Helmet>
            <section className="container mx-auto py-10 px-50 ">
                <div className="flex flex-col md:flex-row">
                    {/* Main Content */}
                    <div className="md:w-2/3 w-full px-4">
                        <img src="../img/attraction/sajek.png" alt="Sundarban" className="w-full h-[500px] object-cover" />
                        <h4 className="text-2xl font-semibold mt-4">THE SUNDARBAN GEST MANGROVE FOREST</h4>

                        {/* Post Meta */}
                        <ul className="flex space-x-4 text-gray-500 text-sm mt-2">
                            <li className="flex items-center"><i className="bi bi-person mr-1"></i>admin</li>
                            <li className="flex items-center"><i className="bi bi-clock mr-1"></i>May 13, 2024</li>
                            <li className="flex items-center"><i className="bi bi-chat mr-1"></i>comments</li>
                        </ul>
                        <hr className="my-4" />

                        {/* Post Content */}
                        <div className="space-y-6 text-justify text-gray-700">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit... libero porro alias iste totam!</p>
                            <div className="border-l-4 border-gray-300 pl-6 italic">Lorem ipsum dolor sit amet consectetur adipisicing elit... laborum.</div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit... Dignissimos, eaque?</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit... delectus blanditiis voluptas!</p>
                        </div>

                        {/* Comments */}
                        <div className="mt-10">
                            <h3 className="text-xl text-gray-600">6 COMMENTS</h3>
                            <hr className="my-4" />

                            {[1, 2, 3].map((comment, index) => (
                                <div key={index} className="flex mb-6">
                                    <img src="../img/attraction/blank-profile.png" alt="Profile" className="w-14 h-14 rounded-full" />
                                    <div className="ml-4">
                                        <h6 className="font-semibold">demo</h6>
                                        <p className="text-xs text-gray-500">Post author May 13, 2014 at 4:25 pm</p>
                                        <p className="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, nostrum?</p>
                                        <a href="#" className="text-blue-500 text-sm">Reply</a>
                                    </div>
                                </div>
                            ))}

                            {/* Comment Form */}
                            <form className="mt-6 mb-10">
                                <textarea className="w-full border p-3 rounded-md" rows="4" placeholder="Write a comment..."></textarea>
                                <div className="text-right mt-4">
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:w-1/3 w-full px-4 mt-10 md:mt-0">
                        {/* Search */}
                        <div className="bg-gray-50 p-4 mb-10 rounded-md">
                            <form className="flex items-center space-x-2">
                                <input type="search" placeholder="Search" className="flex-grow p-2 border rounded-md" />
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Search</button>
                            </form>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-gray-50 p-4 mb-10 rounded-md">
                            <h4 className="font-semibold mb-4">RECENT POSTS</h4>
                            {['Tangaur.png', 'pahar.png', 'sajek.png', 'cox.png'].map((img, index) => (
                                <div key={index} className="flex items-start mb-4">
                                    <img src={`../img/attraction/${img}`} alt="Post" className="w-16 h-16 object-cover mr-4" />
                                    <a href="#" className="text-sm text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</a>
                                </div>
                            ))}
                        </div>

                        {/* Categories */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-semibold mb-4">CATEGORIES</h4>
                            {['Travels', 'Nature', 'Sundarban', 'Sajek Valley', 'Favourit Spots'].map((cat, index) => (
                                <div key={index} className="mb-2">
                                    <a href="#" className="text-sm text-gray-700">{cat}</a>
                                    <hr className="my-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
                <Pakage />
        </div>
    );
};

export default Sajek;