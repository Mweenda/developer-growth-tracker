import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useFirebase } from '../context/AuthContext';
import devImage from '../t043r.png';

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

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const SignInPage = ({ onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { auth } = useFirebase();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Successfully signed in!');
        } catch (err) {
            console.error(err);
            const errorMessage = 'Failed to sign in. Please check your email and password.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="w-full max-w-4xl flex bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                {/* Image Section - Hidden on small screens */}
                <div className="hidden md:flex w-1/2 p-6 justify-center items-center">
                    <img src={devImage} alt="Developer Growth" className="w-full h-auto object-cover rounded-md" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 sm:p-10">
                    <motion.h2 
                        className="text-3xl font-extrabold text-blue-400 text-center mb-6 cursor-pointer hover:text-blue-300 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        🚀 Growth Tracker
                        <br />
                        <br />
                        Sign In to Your Account
                    </motion.h2>
                    {error && <motion.div variants={itemVariants} className="bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-center border border-red-700">{error}</motion.div>}
                    <form onSubmit={handleSignIn} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-400">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-400">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </motion.div>
                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                        >
                            Sign In
                        </motion.button>
                    </form>
                    <motion.div variants={itemVariants} className="mt-6 text-center text-sm">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <a href="#" onClick={onSwitchToSignUp} className="font-medium text-blue-600 hover:text-blue-500">
                                Sign Up
                            </a>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignInPage;