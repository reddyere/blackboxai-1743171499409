import { useStream } from '../context/StreamContext';

const StreamPlayer = () => {
  const { currentStream, streamMetadata } = useStream();

  return (
    <div className="stream-player bg-black rounded-lg overflow-hidden">
      {currentStream ? (
        <div className="relative">
          <video 
            controls 
            autoPlay 
            className="w-full aspect-video"
            poster={streamMetadata.thumbnailUrl}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-xl font-bold text-white">
              {streamMetadata.title}
            </h2>
            <p className="text-gray-300">{streamMetadata.description}</p>
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                LIVE
              </span>
              <span className="ml-2 text-gray-300">
                {streamMetadata.viewerCount} viewers
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No stream selected
        </div>
      )}
    </div>
  );
};

export default StreamPlayer;
export {};
