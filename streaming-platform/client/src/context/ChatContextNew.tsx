import React, { createContext, useContext, useState } from 'react';

type Message = {
  id: string;
  text: string;
  userId: string;
  username: string;
  streamId: string;
  timestamp: number;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (message: Omit<Message, 'id'|'timestamp'>) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  deleteMessage: (id: string) => void;
  banUser: (userId: string) => void;
};

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isTyping: false,
  setIsTyping: () => {},
  deleteMessage: () => {},
  banUser: () => {}
});

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (message: Omit<Message, 'id'|'timestamp'>) => {
    setMessages(prev => [...prev, {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now()
    }]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const banUser = (userId: string) => {
    setMessages(prev => prev.filter(msg => msg.userId !== userId));
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      isTyping,
      setIsTyping,
      deleteMessage,
      banUser
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};