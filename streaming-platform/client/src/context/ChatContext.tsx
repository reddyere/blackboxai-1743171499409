import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback
} from 'react';

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (text: string, senderId: string) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  deleteMessage: (messageId: string) => void;
  banUser: (userId: string) => void;
  bannedUsers: string[];
};

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
  isTyping: false,
  setIsTyping: () => {},
  deleteMessage: () => {},
  banUser: () => {},
  bannedUsers: []
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);

  const sendMessage = useCallback((text: string, senderId: string) => {
    if (bannedUsers.includes(senderId)) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, [bannedUsers]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const banUser = useCallback((userId: string) => {
    setBannedUsers(prev => [...prev, userId]);
    setMessages(prev => prev.filter(msg => msg.senderId !== userId));
  }, []);

  const filteredMessages = useMemo(() => 
    messages.filter(msg => !bannedUsers.includes(msg.senderId)),
    [messages, bannedUsers]
  );

  const value = useMemo(() => ({
    messages: filteredMessages,
    sendMessage,
    clearMessages,
    isTyping,
    setIsTyping,
    deleteMessage,
    banUser,
    bannedUsers
  }), [filteredMessages, sendMessage, clearMessages, isTyping, deleteMessage, banUser, bannedUsers]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  return useContext(ChatContext);
};
