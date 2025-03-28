import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useStream } from '../context/StreamContext';
import { useAuth } from '../context/AuthContext';

const StreamChat = () => {
  const { messages, sendMessage, isTyping, setIsTyping, deleteMessage, banUser } = useChat();
  const { currentStream } = useStream();
  const { currentUser } = useAuth() as { currentUser: { uid: string } | null };
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && currentUser) {
      sendMessage(message, currentUser.uid);
      setMessage('');
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!currentStream) return null;

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">Stream Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col group">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-400 text-sm font-medium">
                {msg.senderId === currentUser?.uid ? 'You' : `User-${msg.senderId.slice(0, 4)}`}
              </span>
              <span className="text-gray-500 text-xs">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <p className="text-white">{msg.text}</p>
              {currentUser?.uid !== msg.senderId && (
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                    title="Delete message"
                  >
                    ×
                  </button>
                  <button 
                    onClick={() => banUser(msg.senderId)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                    title="Ban user"
                  >
                    ⛔
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-gray-400 italic">Someone is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default StreamChat;