import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authslice';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/admin/signin');
            toast.success('Logged out successfully');
            setIsDropdownOpen(false); // Close dropdown after logout
        } catch (error) {
            console.log(error);
            toast.error('Error logging out');
        }
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            className="flex items-center space-x-2 group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">FB</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                                FlamezBlog
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/home"
                                className={`text-sm font-medium transition-colors duration-200 !no-underline ${
                                    isActiveRoute('/') 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blogs"
                                className={`text-sm font-medium transition-colors duration-200 !no-underline ${
                                    isActiveRoute('/blogs') 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                Articles
                            </Link>
                            <Link
                                to="/create-post"
                                className=" !no-underline text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            >
                                Write
                            </Link>
                        </div>

                        {/* Desktop User Menu - CLICK-BASED DROPDOWN */}
                        <div className="hidden md:flex items-center space-x-4">
                            {userInfo ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/create-post"
                                        className="!no-underline bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                                    >
                                        New Post
                                    </Link>
                                    
                                    {/* Click-based Dropdown */}
                                    <div className="relative z-50" ref={dropdownRef}>
                                        <button 
                                            onClick={toggleDropdown}
                                            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {userInfo.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{userInfo.name}</span>
                                            <svg 
                                                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 border-b border-gray-100 transition-colors duration-200 hover:text-blue-600 !no-underline"
                                                >
                                                    My Profile
                                                </Link>
                                                <button
                                                    onClick={logoutHandler}
                                                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                        <div className="px-4 py-3 space-y-3">
                            <Link
                                to="/home"
                                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                                    isActiveRoute('/') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blogs"
                                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                                    isActiveRoute('/blogs') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Articles
                            </Link>
                            <Link
                                to="/create-post"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 !no-underline"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Write
                            </Link>
                            
                            {userInfo ? (
                                <>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="px-3 py-2 text-sm text-gray-500">
                                            Signed in as {userInfo.name}
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                        
                                        <button
                                            onClick={() => {
                                                logoutHandler();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                                    <Link
                                        to="/login"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block px-3 py-2 text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed nav */}
            <div className="h-16"></div>
        </>
    );
};

export default Navbar;