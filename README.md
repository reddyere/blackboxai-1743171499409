build by sharath
# Streaming Platform

A modern streaming platform built with React, Tailwind CSS, and Firebase.

## Features
- Live video streaming
- Real-time chat functionality
- User authentication
- Responsive design

## Technologies
- Frontend: React, Tailwind CSS
- Backend: Firebase (Authentication, Firestore)
- State Management: React Context API

## Installation
1. Clone the repository
```bash
git clone [repository-url]
cd streaming-platform
```

2. Install dependencies
```bash
cd client
npm install
```

3. Set up Firebase
- Create a `.env` file in `/client` with your Firebase config:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

4. Run the development server
```bash
npm start
```

## Project Structure
```
streaming-platform/
├── client/               # Frontend code
│   ├── public/           # Static files
│   ├── src/              # React components
│   │   ├── components/   # UI components
│   │   ├── context/      # State management
│   │   ├── firebase.ts   # Firebase config
│   │   └── ...           # Other source files
│   ├── tailwind.config.js # Tailwind config
│   └── postcss.config.js # PostCSS config
```

## Available Scripts
- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Runs tests
- `npm run eject`: Ejects from Create React App

## Deployment
To deploy to Firebase Hosting:
1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

2. Deploy
```bash
firebase login
firebase init
firebase deploy
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first.
