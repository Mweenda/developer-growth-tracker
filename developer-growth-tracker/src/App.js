import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FirebaseProvider, useFirebase } from './context/AuthContext';
import { auth } from './firebase/config';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const App = () => {
    const { currentUser, isAuthReady } = useFirebase();
    const [currentAuthView, setCurrentAuthView] = useState('signin');

    if (!isAuthReady) {
        return <LoadingSpinner />;
    }

    if (!currentUser) {
        return (
            <motion.div
                className="relative font-sans bg-gray-900 text-gray-100 min-h-screen"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {currentAuthView === 'signin' ? (
                    <SignInPage onSwitchToSignUp={() => setCurrentAuthView('signup')} />
                ) : (
                    <SignUpPage onSwitchToSignIn={() => setCurrentAuthView('signin')} />
                )}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="relative font-sans bg-gray-900 text-gray-100 min-h-screen"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <HomePage userId={currentUser.uid} />
        </motion.div>
    );
};

const RootApp = () => (
    <FirebaseProvider>
        <App />
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#1f2937',
                    color: '#f3f4f6',
                    border: '1px solid #374151',
                },
                success: {
                    style: {
                        background: '#065f46',
                        color: '#d1fae5',
                        border: '1px solid #10b981',
                    },
                },
                error: {
                    style: {
                        background: '#7f1d1d',
                        color: '#fecaca',
                        border: '1px solid #ef4444',
                    },
                },
            }}
        />
    </FirebaseProvider>
);

export default RootApp;