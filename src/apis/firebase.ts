import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  
  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // databaseUrl:import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  // projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { database, auth, provider, signInWithPopup, signOut };
