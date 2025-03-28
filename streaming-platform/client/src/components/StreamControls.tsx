import React, { useState, useRef, useEffect } from 'react';
import { useStream } from '../context/StreamContext';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaCog 
} from 'react-icons/fa';

const StreamControls = () => {
  const { currentStream, streamMetadata } = useStream();
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');
  const videoRef = useRef<HTMLVideoElement>(null);

  const qualities = [
    { label: 'Auto', value: 'auto' },
    { label: '1080p', value: '1080' },
    { label: '720p', value: '720' },
    { label: '480p', value: '480' }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const changeQuality = (newQuality: string) => {
    setQuality(newQuality);
    setShowSettings(false);
    // TODO: Implement actual quality change logic
  };

  if (!currentStream) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button 
          onClick={togglePlay}
          className="text-white hover:text-gray-300 transition p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute}
            className="text-white hover:text-gray-300 transition p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 accent-indigo-500"
          />
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-white hover:text-gray-300 transition p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            aria-label="Settings"
          >
            <FaCog size={16} />
          </button>
          
          {showSettings && (
            <div className="absolute bottom-full left-0 mb-2 bg-gray-700 rounded shadow-lg p-2 min-w-[120px]">
              <div className="text-white text-sm font-medium mb-1">Quality</div>
              {qualities.map((q) => (
                <button
                  key={q.value}
                  onClick={() => changeQuality(q.value)}
                  className={`block w-full text-left px-2 py-1 text-sm rounded ${
                    quality === q.value 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-white text-sm">
        {streamMetadata.viewerCount > 0 && (
          <span>{streamMetadata.viewerCount} viewers</span>
        )}
      </div>

      {/* Hidden video element for control reference */}
      <video ref={videoRef} className="hidden" />
    </div>
  );
};

export default StreamControls;