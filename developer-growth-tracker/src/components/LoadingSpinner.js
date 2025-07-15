import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
    >
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-xl font-medium tracking-wide">Initializing Matrix...</p>
    </motion.div>
);

export default LoadingSpinner; 