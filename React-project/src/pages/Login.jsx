import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router';
// import { useGoogleLogin, googleLogout} from '@react-oauth/google';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from "../store/useAuthStore";

const Login = () => {
    
    const auth = getAuth(app);
    const [_user, _loading, _error] = useAuthState(auth);
    // const [signInWithGoogle] = useSignInWithGoogle(auth);

    
    
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },} = useForm()
    



    const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({
    prompt: 'select_account' // This forces the account selection popup every time
    });

    try {
    const result = await signInWithPopup(auth, provider);
    console.log('Google login success:', result.user);
    navigate('/');
    } catch (error) {
    console.error('Google login error:', error.message);
    }
};
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    useEffect(()=>{
        if (_user) {

            navigate('/');
        }
        else if (isLoggedIn) {
            navigate('/');
        }
    }, [_user,isLoggedIn, navigate]);

    const setAuth = useAuthStore((s) => s.setAuth);

        const mutation = useMutation({
        mutationFn: async (data) => {
            // Accept all statuses so we can handle 4xx without axios throwing
            const res = await axios.post("http://localhost:5000/auth/login", data, { validateStatus: () => true });
            return res;
        },
        onSuccess: (res) => {
            if (res?.status >= 200 && res?.status < 300) {
                const token = res.data?.token;
                const user = res.data?.user;
                const role = user?.role;
                if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuth({ token, role, user });
                Swal.fire({ icon: 'success', title: 'Login successful', text: res.data?.message || 'Welcome' });
                navigate('/');
            } else {
                Swal.fire({ icon: 'error', title: 'Login failed', text: res?.data?.message || 'Invalid credentials' });
            }
        },
        onError: (err) => {
            Swal.fire({ icon: 'error', title: 'Login failed', text: err?.message || 'Network error' });
        },
    });

    const onSubmit = (data) => mutation.mutate(data);
    

    return (
        <div>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Log in to your account to access exclusive travel deals and services." />
            </Helmet>
            <div class="bg-white">
                <div class="flex flex-col items-center justify-center py-8 px-4">
                    <div class="max-w-[480px] w-full">
                        <div class="p-6 sm:px-8 py-8 rounded-2xl bg-white border border-gray-200 shadow-xl">
                            <h1 class="text-slate-900 text-center text-2xl font-semibold">Log in</h1>
                            <form class="mt-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label class="text-slate-900 text-sm font-medium mb-2 block">User name</label>
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
                                                message: "Email is required"
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email address"
                                            }
                                        },
                                        
                                    )}/>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                        </svg>
                                </div>
                                </div>
                                <div>
                                    <label class="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                                    <div class="w-full mb-6 ">
                                        <input type="password" id = "password" autoComplete="new-password" class="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter password" {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is required" 
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"

                                            }
                                        })}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                                    
                                    </div>
                                </div>
                                <div class="flex flex-wrap items-center justify-between gap-4">
                                    <div class="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                                        <label for="remember-me" class="ml-3 block text-sm text-slate-900">
                                            Remember me
                                        </label>
                                    </div>
                                    <div class="text-sm">
                                        <a href="javascript:void(0);" class="text-blue-600 hover:underline font-semibold">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div class="!mt-12 justify-center flex">
                                    <button type="submit" class="w-80 py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                                        Log in
                                    </button>
                                </div>
                                <p class="text-slate-900 text-sm !mt-6 text-center">Don't have an account? <Link to="/register" class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
                            </form>

                            {/* <!-- Social Icons --> */}
                            <div className="text-center">
                                <p className="text-sm mb-2">or Log in with:</p>
                                <div className="flex justify-center space-x-3">
                                    <button type="button" onClick={() => googleLogin()}>
                                        <i className="bi bi-google text-red-600 text-xl"></i>
                                    </button>
                                    <button type="button">
                                        <i className="bi bi-facebook text-blue-800 text-xl"></i>
                                    </button>
                                    <button type="button"><i className="bi bi-twitter text-blue-500 text-xl"></i></button>
                                    <button type="button"><i className="bi bi-github text-gray-800 text-xl"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;