import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode,
  useMemo,
  useEffect,
  useCallback
} from 'react';

type StreamMetadata = {
  title: string;
  description: string;
  thumbnailUrl: string;
  viewerCount: number;
  isLive: boolean;
  startedAt: Date | null;
};

type StreamContextType = {
  currentStream: string | null;
  streamMetadata: StreamMetadata;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;
  setCurrentStream: (id: string | null) => void;
  updateMetadata: (metadata: Partial<StreamMetadata>) => void;
  refreshStream: () => Promise<void>;
};

const defaultMetadata: StreamMetadata = {
  title: '',
  description: '',
  thumbnailUrl: '',
  viewerCount: 0,
  isLive: false,
  startedAt: null
};

const StreamContext = createContext<StreamContextType>({
  currentStream: null,
  streamMetadata: defaultMetadata,
  connectionStatus: 'disconnected',
  error: null,
  setCurrentStream: () => {},
  updateMetadata: () => {},
  refreshStream: async () => {}
});

interface StreamProviderProps {
  children: ReactNode;
}

export const StreamProvider = ({ children }: StreamProviderProps) => {
  const [currentStream, setCurrentStream] = useState<string | null>(null);
  const [streamMetadata, setStreamMetadata] = useState<StreamMetadata>(defaultMetadata);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  const updateMetadata = (metadata: Partial<StreamMetadata>) => {
    setStreamMetadata(prev => ({ ...prev, ...metadata }));
  };

  const refreshStream = useCallback(async () => {
    if (!currentStream) return;
    
    try {
      setConnectionStatus('connecting');
      // TODO: Implement actual stream connection logic
      setConnectionStatus('connected');
      setError(null);
    } catch (err) {
      setConnectionStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to connect to stream');
    }
  }, [currentStream]);

  useEffect(() => {
    if (currentStream) {
      refreshStream();
    } else {
      setConnectionStatus('disconnected');
      setStreamMetadata(defaultMetadata);
    }
  }, [currentStream, refreshStream]);

  const value = useMemo(() => ({
    currentStream,
    streamMetadata,
    connectionStatus,
    error,
    setCurrentStream,
    updateMetadata,
    refreshStream
  }), [currentStream, streamMetadata, connectionStatus, error, refreshStream]);

  return (
    <StreamContext.Provider value={value}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = (): StreamContextType => {
  return useContext(StreamContext);
};
