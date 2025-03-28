import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { StreamProvider } from './context/StreamContext';
import StreamPlayer from './components/StreamPlayer';
import StreamChat from './components/StreamChat';
import StreamInfo from './components/StreamInfo';
import StreamControls from './components/StreamControls';

const HomePage = () => <div>Home Page</div>;
const StreamPage = () => (
  <div className="stream-page">
    <div className="stream-main">
      <StreamPlayer />
      <StreamControls />
    </div>
    <div className="stream-sidebar">
      <StreamChat />
      <StreamInfo />
    </div>
  </div>
);
const ProfilePage = () => <div>Profile Page</div>;
const Navbar = () => <nav>Navigation</nav>;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <StreamProvider>
            <div className="app-container">
              <Navbar />
              <main className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/stream" element={<StreamPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
            </div>
          </StreamProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
