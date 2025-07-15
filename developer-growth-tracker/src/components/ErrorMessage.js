import React from 'react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
    >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
    </motion.div>
);

export default ErrorMessage; 