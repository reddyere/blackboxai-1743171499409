import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useStream } from '../context/StreamContext';

const StreamPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { 
    currentStream, 
    streamMetadata, 
    connectionStatus, 
    error,
    refreshStream
  } = useStream();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentStream) return;

    let hls: Hls;

    const setupPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(`/streams/${currentStream}/index.m3u8`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => console.error('Auto-play failed:', e));
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            refreshStream();
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = `/streams/${currentStream}/index.m3u8`;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => console.error('Auto-play failed:', e));
        });
      }
    };

    setupPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [currentStream, refreshStream]);

  if (!currentStream) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-white">No stream selected</p>
      </div>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
      {connectionStatus === 'connecting' && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <p className="text-white">Connecting to stream...</p>
        </div>
      )}
      
      {streamMetadata.title && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
          <h2 className="font-bold">{streamMetadata.title}</h2>
          {streamMetadata.viewerCount > 0 && (
            <p className="text-sm">{streamMetadata.viewerCount} viewers</p>
          )}
        </div>
      )}

      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default StreamPlayer;
