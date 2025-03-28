import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { app, auth } from './firebase'; // Import auth to force initialization

// Debug checks
console.log('Firebase app initialized:', app.name);
console.log('Firebase auth initialized:', auth.app.name);
console.log('Firebase config:', {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY?.substring(0, 5) + '...',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
