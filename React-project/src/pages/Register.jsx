import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";
// Ensure this imports your Firebase configuration
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
    const auth = getAuth(app);
    const [_user, _loading, _error] = useAuthState(auth);
    // const [signInWithGoogle] = useSignInWithGoogle(auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

    useEffect(() => {
        if (_user) {

            navigate('/');
        }
        else if (isLoggedIn) {
            navigate('/');
        }
    }, [_user, isLoggedIn, navigate]);

    // TanStack Query mutation for registration
    const setAuth = useAuthStore((s) => s.setAuth);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("http://localhost:5000/auth/register", data);
            return res.data;
        },
        onSuccess: (data) => {
            // Save token and user to zustand store and cookies
            const token = data?.token;
            const user = data?.user;
            const role = user?.role;
            if (token) {
                // set axios default header for future requests
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            setAuth({ token, role, user });
            Swal.fire({
                icon: "success",
                title: "Registration successful",
                text: "You have been registered successfully!",
            }).then(() => {
                navigate("/");
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: error.response?.data?.message || "An error occurred",
                // timer: 2000,
                // showConfirmButton: false,
            });
        },
    });


    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account", // This forces the account selection popup every time
        });

        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google login success:", result.user);
            navigate("/");
        } catch (error) {
            console.error("Google login error:", error.message);
        }
    };

    useEffect(() => {
        if (_user) {
            navigate("/");
        }
    }, [_user, navigate]);

    return (
        <div>
            <section className="py-10">
                <Helmet>
                    <title>Register</title>
                    <meta
                        name="description"
                        content="Create an account to start booking your travel adventures."
                    />
                </Helmet>
                <div className="container mx-auto  px-4 ">
                    <div className="flex justify-center">
                        <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xl">
                            <form
                                className="bg-white shadow-none rounded px-8 pt-2 pb-1 mb-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <h4 className="text-2xl font-semibold text-center mb-6">
                                    Sign Up
                                </h4>

                                {/* Name (single field) */}
                                <div className="mb-6 w-full">
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Name"
                                        autoComplete="off"
                                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Name is required",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters",
                                            },
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                {/* <div className="w-full">
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                                        />
                                    </div>
                                </div> */}

                                {/* <!-- Email --> */}
                                <div className="mb-6 w-full">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email address"
                                        autoComplete="off"
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "Email is required",
                                            },
                                            pattern: {
                                                value:
                                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        class="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="10"
                                            cy="7"
                                            r="6"
                                            data-original="#000000"
                                        ></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>

                                {/* <!-- Password --> */}
                                <div className="mb-6 w-full">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is required",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* <!-- Repeat Password --> */}
                                <div className="mb-6 w-full">
                                    <input
                                        type="password"
                                        id="repeatPassword"
                                        placeholder="Repeat Password"
                                        autoComplete="new-password"
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                                        {...register("repeatPassword", {
                                            required: true,
                                            validate: (value) =>
                                                value === watch("password") || "Passwords do not match",
                                        })}
                                    />
                                    {errors.repeatPassword && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.repeatPassword.message}
                                        </p>
                                    )}
                                </div>

                                {/* <!-- Terms Checkbox --> */}
                                <div className="flex items-center justify-center mb-5">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mr-2 accent-blue-500"
                                        {...register("terms", {
                                            required: "You must agree to the terms",
                                        })}
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700">
                                        I agree all statements in{" "}
                                        <a href="#!" className="text-blue-600 hover:underline">
                                            Terms of service
                                        </a>
                                    </label>
                                </div>

                                {/* <!-- Register Button --> */}
                                <div className="flex justify-center mb-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded transition duration-200 w-80"
                                    >
                                        Register
                                    </button>
                                </div>

                                {/* <!-- Social Icons --> */}
                                <div className="text-center">
                                    <p className="text-sm mb-2">or sign up with:</p>
                                    <div className="flex justify-center space-x-3">
                                        <button type="button">
                                            <i
                                                className="bi bi-google text-red-600 text-xl"
                                                onClick={() => googleLogin()}
                                            ></i>
                                        </button>
                                        <button type="button">
                                            <i className="bi bi-facebook text-blue-800 text-xl"></i>
                                        </button>
                                        <button type="button">
                                            <i className="bi bi-twitter text-blue-500 text-xl"></i>
                                        </button>
                                        <button type="button">
                                            <i className="bi bi-github text-gray-800 text-xl"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
