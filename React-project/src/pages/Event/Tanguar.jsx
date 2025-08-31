import React, { useState } from 'react';
import Pakage from '../Pakage';

const Tanguar = () => {
    const [comment, setComment] = useState('');
    return (
        <div>
            <section className="py-8 px-50 gap-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-8/12 px-4">
                        <div>
                            <img className="w-full h-[500px] object-cover" src="../img/attraction/Tangaur.png" alt="" />
                        </div>
                        <h4 className="mt-4 text-xl font-semibold">TANGUAR HAOR</h4>
                        <div className="mt-4">
                            <ul className="flex space-x-4 text-sm text-gray-600">
                                <li className="flex items-center space-x-1"><i className="bi bi-person"></i><span>admin</span></li>
                                <li className="flex items-center space-x-1"><i className="bi bi-clock"></i><span>May 13, 2024</span></li>
                                <li className="flex items-center space-x-1"><i className="bi bi-chat"></i><span>comments</span></li>
                            </ul>
                            <hr className="mt-2" />
                        </div>
                        <div className="mt-6 text-gray-700 space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non officia eligendi
                                impedit excepturi delectus minima perspiciatis nisi expedita officiis illum magnam,
                                possimus a recusandae id unde. Ut explicabo odio quis cupiditate deserunt ipsum fugit
                                doloribus architecto exercitationem distinctio.
                            </p>
                            <div className="border-l-4 border-gray-300 pl-4 italic">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium pariatur totam ipsa
                                corrupti repellat, enim velit commodi, veniam qui quidem hic ducimus sed nostrum nemo
                                deserunt accusantium quisquam dolorum voluptas.
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem porro earum adipisci.
                                Quasi tempora amet veritatis cupiditate, eius dolor velit alias fugit.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ratione. Veniam ab soluta
                                dolorem excepturi voluptates magnam inventore voluptatum omnis nesciunt.
                            </p>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-xl text-gray-500 mb-4">6 COMMENTS</h3>
                            <div className="space-y-8">
                                {[1,2,3].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <img className="w-14 h-14 rounded-full" src="../img/attraction/blank-profile.png" alt="" />
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h6 className="font-semibold">demo</h6>
                                                <a href="#" className="text-blue-500 text-sm">Reply</a>
                                            </div>
                                            <p className="text-gray-500 text-sm">Post author May 13, 2014 at 4:25 pm</p>
                                            <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form className="mt-6">
                                <textarea 
                                    className="w-full border rounded-md p-2 mb-4" 
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                ></textarea>
                                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md">Comment</button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 mt-10 lg:mt-0">
                        <div className="bg-gray-50 p-4 mb-6">
                            <form className="flex items-center space-x-2">
                                <input className="flex-grow border rounded-md p-2" type="search" placeholder="Search" />
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Search</button>
                            </form>
                        </div>
                        <div className="bg-gray-50 p-4 mb-6">
                            <h4 className="text-lg font-semibold mb-4">RECENT POSTS</h4>
                            {["Tangaur.png", "pahar.png", "sajek.png", "cox.png"].map((img, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <img className="w-16 h-16 object-cover" src={`../img/attraction/${img}`} alt="" />
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-4">
                            <h4 className="text-lg font-semibold mb-4">CATEGORIES</h4>
                            {['Travels', 'Nature', 'Sundarban', 'Sajek Valley', 'Favourit Spots'].map((cat, index) => (
                                <div key={index} className="border-b py-2">
                                    <a href="#" className="text-gray-600">{cat}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Pakage />
        </div>
    );
};

export default Tanguar;