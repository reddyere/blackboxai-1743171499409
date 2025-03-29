import React from 'react';
import StreamPlayer from './StreamPlayer';
import StreamControls from './StreamControls';
import StreamChat from './StreamChatFinal';
import StreamInfo from './StreamInfo';

const StreamPage = () => (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
    <div className="md:w-3/4 p-4">
      <StreamPlayer />
      <StreamControls />
    </div>
    <div className="md:w-1/4 p-4 bg-gray-800">
      <StreamChat />
      <StreamInfo />
    </div>
  </div>
);

export default StreamPage;
