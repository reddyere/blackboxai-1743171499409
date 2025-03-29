import React from 'react';
import StreamPlayer from './StreamPlayer';
import StreamControls from './StreamControls';

const VideoList = ({ type }: { type: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-center text-gray-500">
          {type} videos will be shown here
        </p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const featuredStream = {
    title: 'Featured Live Stream',
    description: 'Join us for this exclusive live event',
    viewers: 1250
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Streaming Platform</h1>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="relative pt-[56.25%]">
            <StreamPlayer />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">{featuredStream.title}</h2>
                <p className="text-gray-300 mt-2">{featuredStream.description}</p>
              </div>
              <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                LIVE
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-400">
              <span>{featuredStream.viewers.toLocaleString()} viewers</span>
            </div>
            <div className="mt-4">
              <StreamControls />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Streams</h2>
        <VideoList type="upcoming" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Past Streams</h2>
        <VideoList type="past" />
      </section>
    </div>
  );
};

export default HomePage;