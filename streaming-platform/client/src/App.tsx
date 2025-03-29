import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContextNew';
import { ChatProvider } from './context/ChatContextNew';
import { StreamProvider } from './context/StreamContextNew';
import EnhancedHomePage from './components/EnhancedHomePage';
import StreamPage from './components/StreamPageNew';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <StreamProvider>
            <Routes>
              <Route path="/" element={<EnhancedHomePage />} />
              <Route path="/stream" element={<StreamPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </StreamProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
