import React from 'react'
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authslice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { Link, useNavigate } from 'react-router-dom';
import {useRegisterMutation} from '../slices/userApiSlice'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(userInfo) {
      navigate("/");
    }
  } , [userInfo, navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

     if(password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

    try {
      const res = await signup({name, email, password, confirmPassword}).unwrap();
      dispatch(setCredentials({name: res.name, email: res.email, token: res.token}));
      navigate("/");
      toast.success("Registration Successful");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* Left Section - Brand & Welcome - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 text-center lg:text-left">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-xl border border-white/60">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FB</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FlamezBlog</h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              Start Your Journey
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              Join <span className="font-semibold text-blue-600">FlamezBlog</span> — where your stories find their audience and your ideas take flight.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Create and publish content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Reach engaged readers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 text-sm">Build your author profile</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link 
                to="/signin" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 underline underline-offset-2"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Signup Form - Compact design */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Mobile-only header */}
          <div className="lg:hidden text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">FlamezBlog</h1>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-1">
              Join Our Community
            </h2>
            <p className="text-gray-600 text-xs">Create your account and start writing</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 lg:p-8">
            <div className="hidden lg:block text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Sign Up</h3>
              <p className="text-gray-500 text-sm">Create your account to start publishing</p>
            </div>

            <form onSubmit={registerHandler} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg mt-2"
              >
                {isLoading ? <Loader /> : 'Create Account'}
              </button>

              <div className="text-center pt-3 border-t border-gray-200">
                <p className="text-gray-600 text-xs">
                  Already have an account?{' '}
                  <Link 
                    to="/signin" 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup