import { Link } from "react-router";

const Hero = () => {
    return (
        <div>
            {/* hero section  */}
            <section>
                <div className="h-[650px] bg-[url('/img/photo/image.png')] bg-cover bg-fixed relative mt-0">
                    <h2 className="pt-[200px] text-center text-white text-shadow-lg font-bold text-[80px] text-shadow-10xl">Explore The World</h2>
                </div>
            </section>

            <section className="-mt-[50px]">
                <div className="w-full max-w-(--breakpoint-xl) mx-auto pt-30 px-5 pb-20 rounded-3xl bg-white">
                    <div className="grid grid-cols-12 gap-6">
                        <h3 className="col-span-12 text-3xl font-semibold text-gray-800 text-center">Enjoy Your Dream Vacation</h3>
                        <hr className="col-span-12 border-gray-300" />

                        <div className="col-span-1"></div>

                        <div className="col-span-5 pt-3">
                            <h5 className="pt-4 text-gray-700 -ml-6 leading-relaxed">
                                Bangladesh, a country nestled in South Asia, boasts a rich tapestry of cultural heritage,
                                natural beauty, and historical significance. While often overshadowed by its larger neighbors,
                                India and China, Bangladesh offers a diverse range of tourist attractions that captivate
                                visitors.
                                <br />
                                <br />
                                Country nestled in South Asia, boasts a rich tapestry of cultural heritage, natural beauty, and
                                historical significance. While often overshadowed by its larger neighbors, India and China,
                                Bangladesh offers a diverse range of tourist attractions that captivate visitors.
                                <br />
                                <br />
                                Natural beauty, India and China, Bangladesh offers a diverse range and historical significance.
                                <br />
                                <br />
                                <a href="attractions.html" className="inline-block text-blue-600 hover:text-blue-800 pl-2">
                                    Explore More <i className="bi bi-arrow-right-circle"></i>
                                </a>
                            </h5>
                        </div>

                        <div className="col-span-5 pt-3">
                            <img src="img/photo/pexels-photo-13295778.jpeg" alt="Bangladesh Tourism" className="rounded-lg shadow-md" />
                        </div>

                        <div className="col-span-1"></div>
                    </div>
                </div>
            </section>


            <section className="">
                <div className="w-full max-w-(--breakpoint-xl) mx-auto pt-30 px-5 pb-20 rounded-3xl bg-white">
                    <div className="text-center pb-3">
                        <h2 className="text-3xl font-semibold">Explore Our Services</h2>
                    </div>
                    <div className="flex justify-center">
                        <hr className="w-[400px] border-gray-300" />
                    </div>
                    <div className="text-center pt-3">
                        <h5 className="text-lg text-gray-600"></h5>
                    </div>
                </div>
            </section>

            <section className="">
                <div className="pt-2 p-5 pb-5 rounded-3 max-w-(--breakpoint-xl) mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2">
                            <div className="text-red-600">
                                <h5>WHO WE ARE</h5><br />
                            </div>
                            <div className="p-2">
                                <h2 className="text-3xl font-normal leading-tight text-black"><b>Explore Travel Destination like never before</b></h2><br />
                                <h6><i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua.</i></h6><br />
                                <div className="flex items-start">
                                    <div className="w-1/12 pl-5">
                                        <i className="bi bi-check2-circle" ></i>
                                    </div>
                                    <div className="w-11/12">
                                        <h6>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</h6>
                                    </div>
                                </div>
                                <div className="flex items-start pt-1">
                                    <div className="w-1/12 pl-5">
                                        <i className="bi bi-check2-circle"></i>
                                    </div>
                                    <div className="w-11/12">
                                        <h6>Duis aute irure dolor in reprehenderit in voluptate velit.</h6>
                                    </div>
                                </div>
                                <div className="flex items-start pt-1">
                                    <div className="w-1/12 pl-5">
                                        <i className="bi bi-check2-circle"></i>
                                    </div>
                                    <div className="w-11/12">
                                        <h6>Ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis irure dolor in voluptate
                                            trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</h6>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className="w-full md:w-1/4 pt-1">
                                <div className="w-30">
                                    <a href="attractions.html" className="rounded-xl w-full block text-center bg-white border border-x-black text-black py-2 px-2 ">Explore More</a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 pt-1">
                            <img src="img/services/about-company-1.jpg" className="rounded-lg w-full" />
                        </div>
                        <div className="w-full md:w-1/4">
                            <div className="p-2 pb-3">
                                <img src="img/services/about-company-2.jpg" className="rounded-xl w-full" />
                            </div>
                            <div className="p-2 pt-3">
                                <img src="img/services/about-company-3.jpg" className="rounded-xl w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- <section className="">
                <div className="container-fluid container pt-5 p-5 pb-5 rounded-3">
                    <div className="row text-center pb-3">
                        <h2>Explore Our Services</h2>
                    </div>
                    <hr>
                    <div className="row text-center pt-3">
                        <h5>Explore Travel Destination like never before</h5>
                    </div>
                </div>
            </section> --> */}

            <section className="pt-5">
                <div className="pt-5 p-5 pb-5 rounded-3 w-full max-w-(--breakpoint-xl) mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2">
                            <img src="img/photo/features-1.jpg" className="rounded-[20px] w-full" alt="" />
                        </div>
                        <div className="w-full md:w-1/12 pt-5"></div>
                        <div className="w-full md:w-1/3 pt-10">
                            <div className="pt-5 mt-5">
                                <div className="mb-5 w-120">
                                    <div className="bg-blue-50 text-black p-5 rounded-lg">
                                        <h4 className="pt-3 text-xl font-bold"><b>
                                            Hotel Reservation</b></h4>
                                        <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                            itaque, eum ad exercitationem corrupti ipsum quasi facere nemo adipisci animi
                                            recusandae ipsam. Nam, magni iste?
                                        </p>
                                        <div className="flex items-start mt-4">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-base">Et corporis ea eveniet ducimus.</h6>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-base">Exercitationem dolorem sapiente.</h6>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-base">Veniam quia modi magnam.</h6>
                                        </div>
                                        <br />
                                        <a href="stays.html" className="inline-block bg-white border border-black text-black px-4 py-2 rounded hover:bg-blue-500  hover:text-white">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5">
                <div className="pt-5 p-5 pb-5 rounded-3 w-full max-w-(--breakpoint-xl) mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3 pt-10">
                            <div className="pt-5 tr-link">
                                <div className="mb-5 w-120">
                                    <div className="bg-blue-50 text-black p-5 rounded-lg">
                                        <h4 className="pt-3 text-xl font-bold"><b>World Wide Tours</b></h4>
                                        <p className="mt-2 text-base">Quidem qui dolore incidunt aut. In assumenda harum id iusto
                                            lorena plasico mares. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        </p>
                                        <div className="flex items-start mt-4">
                                            <div className="w-1/12">
                                                <i className="bi bi-check2-circle ml-2"></i>
                                            </div>
                                            <div className="w-11/12">
                                                <h6 className="text-sm font-medium">Et corporis ea eveniet ducimus.</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <div className="w-1/12">
                                                <i className="bi bi-check2-circle ml-2"></i>
                                            </div>
                                            <div className="w-11/12">
                                                <h6 className="text-sm font-medium">Exercitationem dolorem sapiente.</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <div className="w-1/12">
                                                <i className="bi bi-check2-circle ml-2"></i>
                                            </div>
                                            <div className="w-11/12">
                                                <h6 className="text-sm font-medium">Veniam quia modi magnam.</h6>
                                            </div>
                                        </div>
                                        <br />
                                        <a href="travels.html" className="inline-block bg-white border border-black text-black px-4 py-2 rounded hover:bg-blue-500  hover:text-white">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-1/6"></div>
                        <div className="w-full md:w-1/2 pt-2">
                            <img src="img/photo/$R8JKO96.jpg" className="rounded-[20px] w-full" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5">
                <div className="pt-5 p-5 pb-5 rounded-3 w-full max-w-(--breakpoint-xl) mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2">
                            <img className="rounded-[20px] w-full" src="img/photo/tabs-1.jpg" alt="" />
                        </div>
                        <div className="w-full md:w-1/12 pt-5"></div>
                        <div className="w-full md:w-1/3 pt-10">
                            <div className="pt-5 mt-5">
                                <div className="mb-5 w-120">
                                    <div className="bg-blue-50 text-black p-5 rounded-lg">
                                        <h4 className="pt-3 text-xl font-bold"><b>
                                            Travel Guides</b></h4>
                                        <p className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                            itaque, eum ad exercitationem corrupti ipsum quasi facere nemo adipisci animi
                                            recusandae ipsam. Nam, magni iste?
                                        </p>
                                        <div className="flex items-start mt-4">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-sm font-medium">Et corporis ea eveniet ducimus.</h6>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-sm font-medium">Exercitationem dolorem sapiente.</h6>
                                        </div>
                                        <div className="flex items-start mt-2">
                                            <i className="bi bi-check2-circle ml-2 mt-1"></i>
                                            <h6 className="ml-3 text-sm font-medium">Veniam quia modi magnam.</h6>
                                        </div>

                                        <br />
                                        <a href="travels.html" className="inline-block bg-white border border-black text-black px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Favourit Packages --> */}
            <section className="pt-30">
                <div className="w-full max-w-(--breakpoint-xl) mx-auto pt-5 p-5 pb-5">
                    <div className="text-center pb-3 -mt-10">
                        <h2 className="text-3xl font-semibold">Favourit Packages</h2>
                    </div>
                    <div className="pl-[410px]">
                        <hr className="w-[400px] border-t-2 border-gray-300" />
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full px-4 md:px-20 pt-5">
                    <div className="flex flex-wrap -mx-4 p-10">
                        <div className="w-full md:w-1/3 px-2 pl-30">
                            <div className="bg-white shadow-xl rounded-lg overflow-hidden w-72 mx-auto">
                                <img src="img/travel/package-1.jpg" className="w-full h-auto" alt="..." />
                                <div className="p-6 pb-4">
                                    <h5 className="text-lg font-semibold"><i className="bi bi-geo-alt"></i> Cox's Bazer</h5>
                                    <h5 className="text-lg font-semibold p-2">$ 149.00</h5>
                                    <p className="text-center-start text-gray-600 text-sm">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <br />
                                    <div className="text-start mt-4">

                                        <Link to="/coxbazar" className=" text-center inline-block bg-white border border-black text-black m-2 px-4 py-1 rounded hover:bg-blue-500 hover:text-white">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 py-2 pl-10">

                            <div className="w-72 shadow-xl rounded-lg overflow-hidden hover:shadow-xl  mx-8 pt-5 mt-10">
                                <img src="img/travel/package-2.jpg" className="rounded-t-lg w-full h-48 object-cover" alt="..." />
                                <div className="p-4">
                                    <h5 className="text-center font-semibold text-lg"><i className="bi bi-geo-alt"></i> Indonesia
                                    </h5>
                                    <h5 className="text-center font-semibold text-lg"   >$ 149.00</h5>
                                    <p className="text-center text-sm mt-2">Some quick example text to build on the
                                        card title and make up the bulk of the card's content.</p>
                                    <br />
                                    <div className="text-start mt-4">

                                        <a href="froms/payment.html" className=" text-center inline-block bg-white border border-black text-black m-2 px-4 py-1 rounded hover:bg-blue-500 hover:text-white">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full md:w-1/3 px-2 pr-30">

                            <div className="w-72 shadow-lg rounded-lg hover:shadow-xl transition duration-300" >
                                <img src="img/travel/package-3.jpg" className="rounded-t-lg w-full h-48 object-cover" alt="..." />
                                <div className="p-4">
                                    <h5 className="text-center font-semibold text-lg"><i className="bi bi-geo-alt"></i> Thailand
                                    </h5>
                                    <h5 className="text-center font-semibold text-lg">$ 149.00</h5>
                                    <p className="text-center text-sm mt-2">Some quick example text to build on the
                                        card title and make up the bulk of the card's content.</p>
                                    <br />

                                    <div className="text-start mt-4">

                                        <a href="froms/payment.html" className="text-center inline-block bg-white border border-black text-black m-2 px-4 py-1 rounded hover:bg-blue-500 hover:text-white">Book Now</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* <!-- footer --> */}

        </div>
    );
};

export default Hero;