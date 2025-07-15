// Mock Firebase Auth
export const getAuth = jest.fn(() => ({
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
}));

// Mock Firebase Firestore
export const getFirestore = jest.fn(() => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Mock Firebase App
export const initializeApp = jest.fn(() => ({
  name: 'test-app',
}));

// Mock Firestore functions
export const doc = jest.fn();
export const getDoc = jest.fn();
export const setDoc = jest.fn();
export const updateDoc = jest.fn();
export const onSnapshot = jest.fn();
export const collection = jest.fn();

// Mock Auth functions
export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const updateProfile = jest.fn();
export const onAuthStateChanged = jest.fn();
export const signOut = jest.fn(); 