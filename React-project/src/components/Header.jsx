import { getAuth } from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router";
import app from "../firebase";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";


const Header = () => {
    const [showDropdown, setShowDropdown] = useState("hidden");
    // const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const role = useAuthStore((s) => s.role);
    const _user = useAuthStore((s) => s.user);
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const auth = getAuth(app);
    const [signOut] = useSignOut(auth);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        clearAuth();
        signOut().then(() => {
            navigate("/login");
        });
    };
    const handleDashboardClick = () => {
        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    };
    return (
        <div>
            <nav className="bg-[#1C7EB7]">
                <div className="bg-[#1C7EB7] ml-[170px] py-2">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap justify-between items-center text-white pt-4 pb-2 mx-auto py-2 px-auto">
                            <div className="w-1/6">
                                <p className="mr-3 ml-3">
                                    <i className="bi bi-telephone"></i> Phone: +880 1307266218
                                </p>
                            </div>
                            <div className="w-1/6 mr-26">
                                <p>
                                    <i className="bi bi-envelope"></i> Mail: travisor@gmail.com
                                </p>
                            </div>
                            {(!user && !_user) && (
                                <>
                                    <div className="w-2/6"></div>
                                    <div className="w-1/12">
                                        <p>
                                            <i className="bi bi-person-add"></i>
                                            <NavLink to="/register" className="text-white hover:underline ml-1">Register</NavLink>
                                        </p>
                                    </div>
                                    <div className="w-1/12 mr-30">
                                        <p>
                                            <i className="bi bi-lock"></i>
                                            <NavLink to="/login" className="text-white hover:underline ml-1">Login</NavLink>
                                        </p>
                                    </div>

                                </>
                            )}

                            {(user || _user) && (
                                <>
                                    <div className="w-1/6"></div>
                                    <div className="w-1/12 flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                            <i className="bi bi-person text-white text-base"></i>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleDashboardClick}
                                            className="text-white hover:underline text-sm font-medium bg-transparent border-none cursor-pointer"
                                        >
                                            DashBoard
                                        </button>
                                    </div>

                                    <div className="w-1/12 mr-20">
                                        <li className="relative">
                                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={() => showDropdown == "hidden" ? setShowDropdown("block") : setShowDropdown("hidden")}>{user?.displayName ?? _user.name} <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg></button>
                                            <div id="dropdownNavbar" className={`z-10 ${showDropdown} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44  dark:divide-gray-600 absolute right-0 top-12`}>
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                                    <li>
                                                        <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</NavLink>
                                                    </li>
                                                    <li>
                                                        <button className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleLogout()}>Log out</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="bg-[#f5efef]">
                <div className=" container mx-auto ">
                    <div className="flex flex-wrap items-center mx-40">
                        <div className="w-1/6">
                            <a href="index.html">
                                <img src="img/logo/logo.png" alt="Logo" className="max-w-full max-h-full m-1" />
                            </a>
                        </div>
                        <div className="w-/12 ">
                            <ul className="flex justify-center space-x-4 list-none p-0 m-0">
                                <li><NavLink to="/" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Home</NavLink></li>
                                <li><NavLink to="/attractions" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Attractions</NavLink></li>
                                <li><NavLink to="/travels" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Travels</NavLink></li>
                                <li><NavLink to="/stays" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Stays</NavLink></li>
                                <li><NavLink to="/help" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Help & Support</NavLink></li>
                                <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "text-black font-bold py-6 px-3" : "text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]")}>Contact</NavLink></li>
                                {/* <li><button className="cursor-pointer text-gray-500  text-shadow-2xs py-6 px-3 hover:text-[#1980B1]">Logout</button></li> */}
                            </ul>
                        </div>
                        <div className="w-1/4 pt-2 ml-5">
                            <form className="flex" role="search">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-base px-4 py-1 border border-gray-300 rounded-md hover:bg-[#cdd0d2] hover:text-white"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;