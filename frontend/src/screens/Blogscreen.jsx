import React from 'react';
import { useGetBlogsQuery } from '../slices/blogApiSlice';
import Navbar from '../components/Header';


const Blogscreen = () => {
  const { data: blogs, isLoading, isError, error } = useGetBlogsQuery();

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading articles...</p>
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Unable to load content
            </h3>
            <p className="text-red-600 text-sm">
              {error?.data?.message || 'Please try again later'}
            </p>
          </div>
        </div>
      </div>
    );

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Blog Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 md:gap-8 mb-12 md:mb-16 ">
          {blogs?.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-lg md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group "
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-28 sm:h-36 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
    

                {/* Blog Content */}
                <div className="p-2 sm:p-3 md:p-6">
                  <div className="flex items-center text-[9px] sm:text-xs text-gray-500 mb-1 sm:mb-2">
                    <span className="bg-blue-100 text-blue-800 text-[9px] sm:text-xs font-medium px-1.5 py-0.5 rounded-full">
                      Article
                    </span>
                    <span className="mx-1 sm:mx-2">•</span>
                    <span>5 min read</span>
                  </div>

                  {/* Blog Title */}
                  <p className="font-bold text-[10px] sm:text-sm md:text-xl text-gray-900 mb-2 mt-2 mr-4 sm:mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {blog.title}
                  </p>

                  {/* Blog Description */}
                  <p className=" text-gray-600 text-[9px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed mb-10 sm:mb-4 md:mb-6 line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Read More + Date */}
                  <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-gray-100">
                    <a
                      href={`/blogs/${blog._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group/btn text-[9px] sm:text-xs md:text-base"
                    >
                      Read article
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>

                    <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">
                      {new Date(blog.date).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We're working on creating valuable content for you. Check back
                soon!
              </p>
              <a
                href="/create-post"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create First Post
              </a>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <a
          href="/create-post"
          className="fixed right-6 bottom-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:scale-110 group"
          aria-label="Create new post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Blogscreen;
