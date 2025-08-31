import React from 'react';
import { Helmet } from 'react-helmet';
import Pakage from '../Pakage';

const Jaflong = () => {
    return (
        <div>
            <Helmet>
                <title>Jaflong</title>
                <meta name="description" content="Discover the serene beauty of Jaflong, a picturesque village on the border of Bangladesh and India." />
            </Helmet>
            <section className="py-10">
                <div className="container mx-auto px-50 flex flex-col lg:flex-row gap-20">

                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="w-full h-[500px] mb-6">
                            <img src="../img/attraction/Jaflong.png" alt="Jaflong" className="w-full h-full  object-cover rounded-xl" />
                        </div>
                        <h4 className="text-2xl font-bold mb-4">THE SERENE BEAUTY OF JAFLONG</h4>

                        <ul className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mb-4">
                            <li className="flex items-center space-x-1"><i className="bi bi-person"></i><span>admin</span></li>
                            <li className="flex items-center space-x-1"><i className="bi bi-clock"></i><span>May 13, 2024</span></li>
                            <li className="flex items-center space-x-1"><i className="bi bi-chat"></i><span>comments</span></li>
                        </ul>

                        <hr className="mb-6" />

                        <div className="space-y-6 text-gray-700">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. ...</p>
                            <blockquote className="border-l-4 pl-4 italic text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium pariatur totam ipsa corrupti repellat...</blockquote>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem porro earum adipisci...</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, ratione. Veniam ab soluta dolorem...</p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl text-gray-600 font-semibold mb-4">6 COMMENTS</h3>
                            <hr className="mb-6" />

                            {[1, 2, 3].map((comment, idx) => (
                                <div key={idx} className="flex items-start space-x-4 mb-6">
                                    <img src="../img/attraction/blank-profile.png" alt="Profile" className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h6 className="font-semibold">demo</h6>
                                        <p className="text-xs text-gray-500">Post author May 13, 2024 at 4:25 pm</p>
                                        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, nostrum?</p>
                                        <a href="#" className="text-blue-500 text-sm hover:underline">Reply</a>
                                    </div>
                                </div>
                            ))}

                            <form className="mt-10">
                                <textarea className="w-full border rounded-md p-3 mb-4" rows="4" placeholder="Write your comment..."></textarea>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Comment</button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-10">
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <form className="flex mb-4">
                                <input type="search" placeholder="Search" className="flex-grow border rounded-l-md px-4 py-2 focus:outline-none" />
                                <button className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700">Search</button>
                            </form>

                            <h5 className="text-lg font-semibold mb-2">Recent Posts</h5>
                            {['Tangaur', 'pahar', 'sajek', 'cox'].map((post, idx) => (
                                <div key={idx} className="flex items-start mb-4">
                                    <img src={`../img/attraction/${post}.png`} alt={post} className="w-16 h-16 object-cover rounded-md" />
                                    <a href={`#${post}`} className="ml-4 text-sm text-gray-600 hover:underline">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a>
                                </div>
                            ))}
                        </div>

                        <div className="bg-purple-50 p-4 rounded-xl">
                            <h4 className="text-lg font-semibold mb-4">Categories</h4>
                            {['Travels', 'Nature', 'Sundarban', 'Sajek Valley', 'Favourit Spots'].map((category, idx) => (
                                <a key={idx} href="#" className="block text-gray-600 hover:underline mb-2">{category}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Pakage />
        </div>
    );
};

export default Jaflong;