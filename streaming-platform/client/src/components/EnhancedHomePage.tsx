import React from 'react';
import { Link } from 'react-router-dom';
import StreamPlayer from './StreamPlayer';
import StreamControls from './StreamControls';

const VideoList = ({ type }: { type: string }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
          <div className="relative pb-[56.25%] bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.8L16 10l-9.7 7.2V2.8z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-medium text-lg mb-1">Stream Title {item}</h3>
            <p className="text-gray-400 text-sm">{type === 'upcoming' ? 'Starts in 2h 30m' : '1.2K views'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-white text-2xl font-bold">StreamHub</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-red-500">Home</Link>
          <Link to="/stream" className="text-gray-400 hover:text-white">Live</Link>
          <Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-white hover:text-red-500 px-4 py-2">Login</Link>
        <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">Register</Link>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const featuredStream = {
    title: 'Featured Live Stream',
    description: 'Join thousands of viewers in this exclusive live event',
    viewers: 1250,
    category: 'Gaming'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative pt-[56.25%] bg-black">
              <StreamPlayer />
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-md mb-2">
                    LIVE NOW
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredStream.title}</h2>
                  <p className="text-gray-300 mb-4">{featuredStream.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                      {featuredStream.viewers.toLocaleString()} viewers
                    </span>
                    <span className="flex items-center text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                      </svg>
                      {featuredStream.category}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <StreamControls />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Streams */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upcoming Streams</h2>
            <Link to="/upcoming" className="text-red-500 hover:text-red-400 font-medium">
              View All →
            </Link>
          </div>
          <VideoList type="upcoming" />
        </section>

        {/* Past Streams */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Past Streams</h2>
            <Link to="/archive" className="text-red-500 hover:text-red-400 font-medium">
              View All →
            </Link>
          </div>
          <VideoList type="past" />
        </section>
      </div>
    </div>
  );
};

export default HomePage;