
const Footer = () => {
    return (
        <div>
            <section>
                <div className="pt-15 pb-4 bg-[#f5efef] mt-10">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="w-1/12"></div>
                            <div className="w-2/12">
                                <a className="navbar-brand" href="#"><img className="logo" src="img/logo/logo.png" alt="" /></a>
                            </div>
                            <div className="w-1/12"></div>
                            <div className="w-2/12 text-gray-400">
                                <p>
                                    <h5 className="text-lg font-semibold text-black mb-2">MAIN MENU</h5>
                                </p>
                                <a href="index.html" className="foot-link">
                                    <h6 className="text-sm">Home</h6>
                                </a>
                                <a href="attractions.html" className="foot-link">
                                    <h6 className="text-sm">Attractions</h6>
                                </a>
                                <a href="travels.html" className="foot-link">
                                    <h6 className="text-sm">Travels</h6>
                                </a>
                                <a href="stays.html" className="foot-link">
                                    <h6 className="text-sm">Stays</h6>
                                </a>
                            </div>
                            <div className="w-2/12 text-gray-400">
                                <p>
                                    <h5 className="text-lg font-semibold text-black mb-2">SUPPORT</h5>
                                </p>
                                <a href="help.html" className="foot-link">
                                    <h6 className="text-sm">Help & Support</h6>
                                </a>
                                <a href="contact.html" className="foot-link">
                                    <h6 className="text-sm">Contact</h6>
                                </a>
                                <a href="froms/register.html" className="foot-link">
                                    <h6 className="text-sm">Register
                                    </h6>
                                </a>
                                <a href="froms/login.html" className="foot-link">
                                    <h6 className="text-sm">Login</h6>
                                </a>
                            </div>

                            <div className="w-3/12">
                                <p>
                                    <h5 className="text-lg font-semibold mb-2">SOCIAL MEDIA</h5>
                                </p>
                                <p className="mt-2 ml-[-2px] space-x-2 my-3 text-lg">
                                    <a href=""><i className="bi bi-facebook foot-icon"></i></a>
                                    <a href=""><i className="bi bi-instagram foot-icon"></i></a>
                                    <a href=""><i className="bi bi-whatsapp foot-icon"></i></a>
                                    <a href=""><i className="bi bi-youtube foot-icon"></i></a>
                                </p>
                                <p className="text-sm my-3 text-left">Daily Update Subscribe Now</p>
                                <form className="flex mt-[-5px]" role="Email">
                                    <input className="form-control me-1 px-4 py-2 rounded-full border border-gray-300 bg-white" type="search" placeholder="Email address"
                                        aria-label="Search" />
                                    <button type="submit" className="change px-4 py-2 rounded-full bg-blue-500 text-white">Subscribe</button>
                                </form>
                                <form className="pt-3">

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="bg-[#197FB3]">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center justify-between pt-4 pb-3 text">
                            <div className="w-full md:w-5/12 px-2">
                                <h6 className="text-white text-sm md:text-base text-center md:text-center">
                                    © 2024 travisor. All rights reserved
                                </h6>
                            </div>
                            <div className="w-full md:w-6/12 px-2 text-left md:text-right mt-2 md:mt-0">
                                <h6 className="text-white text-sm md:text-center    ">
                                    Terms and Conditions | Privacy Policy | Cancellation Policy | Refund Policy
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;