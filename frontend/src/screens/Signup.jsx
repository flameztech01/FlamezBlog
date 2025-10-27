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
     <section
      className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full gap-10 md:gap-24 px-4 md:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/3f/59/1f/3f591f017976303efbd3aa89cb828293.jpg')",
      }}
    >
      {/* Left side text */}
      <div className="text-white text-left max-w-xl hidden md:block">
        <h1 className="text-5xl font-bold mb-10">Welcome</h1>
        <p className="text-[1.1rem] leading-relaxed opacity-80 mb-4">
          Welcome to FlamezBlog — your creative hub for sharing stories, ideas,
          and inspiration. Log in to your account to upload new posts, organize
          drafts, customize your author profile, and connect with readers who
          care about your voice.
        </p>
        <p className="text-[1.1rem] leading-relaxed opacity-80 mb-4">
          Enjoy powerful editing tools, instant previews, and insights to help
          your content reach more people. Whether you're publishing a quick
          thought or a long-form feature, FlamezBlog makes it effortless and
          rewarding.
        </p>
        <p>
          <a
            href="/login"
            className="text-[#ff7f50] font-semibold hover:underline"
          >
            Sign in now and start publishing
          </a>
        </p>
      </div>

      {/* Signup form */}
      <form onSubmit={registerHandler}
        className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Sign up</h1>

        <label htmlFor="username" className="block mb-2 font-semibold">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="email" className="block mb-2 font-semibold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="password" className="block mb-2 font-semibold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="confirm-password" className="block mb-2 font-semibold">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {isLoading && <Loader />}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#ff7f50] via-[#ff944d] to-[#ffd08a] text-white font-semibold py-2 rounded hover:opacity-90 transition">
          Sign up
        </button>

        <p className="text-center text-sm mt-4 opacity-80">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#ff7f50] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Signup
