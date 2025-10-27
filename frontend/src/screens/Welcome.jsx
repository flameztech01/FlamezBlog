import React from "react";
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-[url('https://i.pinimg.com/736x/3f/59/1f/3f591f017976303efbd3aa89cb828293.jpg')] bg-cover bg-center bg-no-repeat bg-fixed text-[#e6eef8] font-[Inter]">
      <section
        role="region"
        aria-labelledby="welcome-title"
        className="max-w-[900px] w-full rounded-xl p-8 flex gap-6 items-center flex-col md:flex-row text-center md:text-left 
          bg-white/10 border border-white/10 backdrop-blur-[10px] backdrop-saturate-[130%]
          shadow-[0_12px_40px_rgba(2,6,23,0.65)]"
      >
        {/* Logo Box */}
        <div
          className="w-[84px] h-[84px] flex items-center justify-center rounded-[10px] font-bold text-[1.25rem] text-white flex-shrink-0
          bg-gradient-to-br from-[#ff6b6b] to-[#ff9a6b]"
          aria-hidden="true"
        >
          FZ
        </div>

        {/* Hero Text */}
        <div className="flex-1">
          <h1
            id="welcome-title"
            className="text-[clamp(1.5rem,4vw,2.25rem)] mb-2 font-semibold"
          >
            Welcome to FlamezBlog
          </h1>
          <p className="mb-4 text-[#c7d2e8]">
            Log in or sign up to post or read blogs from the community.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[#ff6b6b] text-[#07122a] hover:bg-[#ff7b7b] transition"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border border-white/10 text-[#c7d2e8] hover:text-white hover:border-white/30 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Welcome;
