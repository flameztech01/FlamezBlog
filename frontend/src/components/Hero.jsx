import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">Latest Articles Published Daily</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover & Share
            <span className="block bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              Amazing Stories
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of readers exploring insightful articles, 
            <span className="text-gray-800 font-medium"> tech trends, creative ideas</span>, and inspiring stories from passionate writers worldwide.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mb-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">✓</span>
              </div>
              <span>1000+ Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">👥</span>
              </div>
              <span>500+ Writers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-xs">⭐</span>
              </div>
              <span>10K+ Readers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/blogs"
              className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl 
                         hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl 
                         transform hover:-translate-y-1"
            >
              Explore Articles
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link
              to="/create-post"
              className="group inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl 
                         border border-gray-300 hover:border-gray-400 transition-all duration-300 
                         shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Start Writing
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>

          {/* Featured Preview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-gray-200/60 
                         shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Featured Article</span>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Just Published</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              The Future of Web Development: Trends to Watch in 2024
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Explore the latest technologies and frameworks shaping the future of web development, 
              from AI integration to progressive web apps...
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>By Sarah Johnson • 5 min read</span>
              <span>128 views</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;