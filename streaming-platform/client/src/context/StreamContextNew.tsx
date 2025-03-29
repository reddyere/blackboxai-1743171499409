import React, { createContext, useContext, useState } from 'react';

type Stream = {
  id: string;
  name: string;
  isLive: boolean;
};

type StreamContextType = {
  currentStream: Stream | null;
  setCurrentStream: (stream: Stream) => void;
};

const StreamContext = createContext<StreamContextType>({
  currentStream: null,
  setCurrentStream: () => {}
});

export const StreamProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);

  return (
    <StreamContext.Provider value={{ currentStream, setCurrentStream }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) throw new Error('useStream must be used within StreamProvider');
  return context;
};
