import React from 'react';
import { Helmet } from 'react-helmet';
import Pakage from '../Pakage';

const Paharpur = () => {
    return (
        <div>
            <Helmet>
                <title>Paharpur</title>
                <meta name="description" content="Explore the ancient ruins of Paharpur, a UNESCO World Heritage Site in Bangladesh." />
            </Helmet>
            <section className="py-10">
                <div className="container mx-auto px-50 gap-10 flex flex-col lg:flex-row">

                    {/* Left Content */}
                    <div className="lg:w-2/3 w-full">
                        <div>
                            <img className="w-full h-[500px] object-cover" src="../img/attraction/pahar.png" alt="" />
                        </div>
                        <h4 className="text-xl font-semibold mt-4">PAHARPUR THE </h4>

                        <ul className="flex gap-4 text-sm text-gray-500 mt-4">
                            <li><i className="bi bi-person"></i></li>
                            <li><a href="#">admin</a></li>
                            <li><i className="bi bi-clock"></i></li>
                            <li><a href="#">May 13, 2024</a></li>
                            <li><i className="bi bi-chat"></i></li>
                            <li><a href="#">comments</a></li>
                        </ul>

                        <hr className="my-2" />

                        <div className="text-justify text-sm text-gray-700">
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam non officia eligendi impedit excepturi delectus minima perspiciatis nisi expedita officiis illum magnam, possimus a recusandae id unde.
                            </p>
                            <div className="border-l-4 border-gray-300 my-4 pl-4 italic text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium pariatur totam ipsa corrupti repellat.
                            </div>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem porro earum adipisci. Quasi tempora amet veritatis cupiditate.
                            </p>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-10">
                            <h3 className="text-gray-500 text-lg">6 COMMENTS</h3>
                            <hr className="w-3/4 my-2" />

                            {[1, 2, 3].map((item, idx) => (
                                <div key={idx} className="flex gap-4 my-6">
                                    <img className="w-16 h-16 rounded-full" src="../img/attraction/blank-profile.png" alt="Profile" />
                                    <div>
                                        <a href="#" className="font-semibold">{idx % 2 === 0 ? 'demo' : 'admin'}</a>
                                        <span className="text-xs text-gray-400 ml-2">Post author May 13, 2014 at 4:25 pm</span>
                                        <div>
                                            <a href="#" className="text-blue-500 text-sm">Reply</a>
                                        </div>
                                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            ))}

                            <form className="mt-6">
                                <textarea
                                    className="w-full p-2 border rounded mb-4"
                                    rows="4"
                                    placeholder="Write a comment..."
                                ></textarea>
                                <button type="submit" className="bg-purple-500 text-white py-2 px-6 rounded">Comment</button>
                            </form>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:w-1/3 w-full lg:pl-8 mt-10 lg:mt-0">
                        <div className="bg-purple-50 p-4 mb-10">
                            <form className="flex gap-2 mb-6">
                                <input type="text" className="flex-grow border p-2 rounded" placeholder="Search" />
                                <button className="bg-purple-500 text-white px-4 py-2 rounded">Search</button>
                            </form>
                            <p className="font-semibold mb-2">RECENT POST</p>
                            {['Tangaur.png', 'pahar.png', 'sajek.png', 'cox.png'].map((img, idx) => (
                                <div key={idx} className="flex items-center gap-4 mb-4">
                                    <img className="w-20 h-16 object-cover" src={`../img/attraction/${img}`} alt="Recent Post" />
                                    <a href="#" className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</a>
                                </div>
                            ))}
                        </div>

                        <div className="bg-purple-50 p-4">
                            <h4 className="text-gray-500 text-lg mb-4">CATEGORIES</h4>
                            {['Travels', 'Nature', 'Sundarban', 'Sajek Valley', 'Favourite Spots'].map((category, idx) => (
                                <div key={idx}>
                                    <a href="#" className="block text-gray-600 text-sm py-2">{category}</a>
                                    <hr />
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

export default Paharpur;