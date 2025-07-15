import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if we're in a test environment
const isTestEnvironment = process.env.NODE_ENV === 'test';

const firebaseConfig = isTestEnvironment ? {
  apiKey: 'test-api-key',
  authDomain: 'test-project.firebaseapp.com',
  projectId: 'test-project',
  storageBucket: 'test-project.firebasestorage.app',
  messagingSenderId: '123456789',
  appId: 'test-app-id',
  measurementId: 'test-measurement-id'
} : {
  apiKey: "AIzaSyDo5jxteRPqbpDSfS70e0B93nO9i6EwoQw",
  authDomain: "developer-growth-tracker.firebaseapp.com",
  projectId: "developer-growth-tracker",
  storageBucket: "developer-growth-tracker.firebasestorage.app",
  messagingSenderId: "702920459092",
  appId: "1:702920459092:web:e7f1faa286e89f02c07ec1",
  measurementId: "G-CHG3JGWG94"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 