import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authslice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/home'); // Redirect to blog homepage
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://i.pinimg.com/736x/3f/59/1f/3f591f017976303efbd3aa89cb828293.jpg')] bg-no-repeat bg-center bg-cover p-4 gap-24 flex-col md:flex-row">

      {/* Welcome Text Section */}
      <div className="hidden md:block text-white text-left max-w-[600px]">
        <h1 className="text-6xl mb-12 font-bold">Welcome</h1>
        <p className="text-[1.1rem] mb-4 leading-relaxed opacity-80">
          Welcome to <span className="font-semibold text-orange-400">FlamezBlog</span> — your creative hub for sharing stories, ideas, and inspiration.
          Log in to your account to upload new posts, organize drafts, and connect with readers who care about your voice.
        </p>
        <p className="text-[1.1rem] mb-4 leading-relaxed opacity-80">
          Enjoy powerful editing tools, instant previews, and insights to help your content reach more people.
          Whether you're publishing a quick thought or a long-form feature, FlamezBlog makes it effortless and rewarding.
        </p>
        <p>
          <Link
            to="/signup"
            className="text-orange-400 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Sign In Form */}
      <form
        onSubmit={submitHandler}
        className="bg-white/10 backdrop-blur-md border border-white/25 shadow-lg p-8 rounded-lg w-full max-w-[420px]"
      >
        <h1 className="text-white text-center text-3xl mb-4 font-semibold">
          Sign in
        </h1>

        <label htmlFor="email" className="block mb-2 text-white font-semibold text-left">
          Email:
        </label>
        <input className = "text-white"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 text-white rounded outline-none"
        />

        <label htmlFor="password" className="block mb-2 text-white font-semibold text-left">
          Password:
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border text-white border-gray-300 rounded outline-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-300 text-white py-2 rounded hover:opacity-90 transition"
        >
          {isLoading ? <Loader /> : 'Sign in'}
        </button>

        <p className="text-white text-center mt-4 text-sm opacity-80">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-orange-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
