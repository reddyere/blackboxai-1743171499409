import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContextNew';
import { useStream } from '../context/StreamContextNew';
import { useAuth } from '../context/AuthContextNew';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';

const StreamChat = () => {
  const { messages, sendMessage, setIsTyping, deleteMessage } = useChat();
  const { currentStream } = useStream();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user?.uid) {
      sendMessage({
        text: message,
        userId: user.uid,
        username: user.email,
        streamId: typeof currentStream === 'object' && currentStream !== null ? currentStream.id : ''
      });
      setMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-800 p-4 rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg ${user?.uid === msg.userId ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}
          >
            <div className="flex justify-between items-start">
              <span className="font-medium text-white">{msg.username}</span>
              {user?.uid === msg.userId && (
                <button 
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-300 hover:text-red-500 ml-2"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <p className="text-white mt-1">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(true);
            }}
            onBlur={() => setIsTyping(false)}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPaperPlane className="mr-2" /> Send
          </button>
        </form>
      )}
    </div>
  );
};

export default StreamChat;
