import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../slices/blogApiSlice';
import Header from '../components/Header';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ViewBlogScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError, error } = useGetBlogByIdQuery(id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 text-lg">{error?.data?.message || 'Error loading blog'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {blog ? (
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {blog.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{blog.author || 'Anonymous'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(blog.createdAt || new Date())}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {blog.content ? (
                <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {blog.content}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No content available for this blog post.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tags/Categories */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800 text-lg">No blog found</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBlogScreen;