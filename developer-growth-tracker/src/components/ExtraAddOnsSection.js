import React, { useState } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const ExtraAddOnsSection = ({ addOns, onUpdateAddOn }) => {
    const [showDetails, setShowDetails] = useState({});

    const handleAddOnUpdate = (updatedAddOn) => {
        onUpdateAddOn(updatedAddOn);
    };

    const toggleDetails = (addOnName) => {
        setShowDetails(prev => ({
            ...prev,
            [addOnName]: !prev[addOnName]
        }));
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
            <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                Extra Add-ons
            </h2>
            <p className="text-gray-300 mb-8">
                Additional skills and technologies to enhance your developer toolkit.
            </p>
            
            <div className="space-y-4">
                {addOns.map((addOn, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gray-700 p-5 rounded-xl shadow-md border border-gray-600 hover:border-blue-500 transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDetails(addOn.name)}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={addOn.completed}
                                    onChange={(e) => handleAddOnUpdate({ ...addOn, completed: e.target.checked })}
                                    className="form-checkbox h-6 w-6 text-blue-500 rounded-md focus:ring-blue-400"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span className={`ml-4 text-lg font-medium ${addOn.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                    {addOn.name}
                                </span>
                            </div>
                            <svg 
                                className={`w-6 h-6 text-gray-400 transition-transform ${showDetails[addOn.name] ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        
                        {showDetails[addOn.name] && (
                            <div className="mt-4 border-t border-gray-600 pt-4">
                                <label className="block text-sm font-medium text-gray-400">Notes:</label>
                                <textarea
                                    value={addOn.notes || ''}
                                    onChange={(e) => handleAddOnUpdate({ ...addOn, notes: e.target.value })}
                                    rows="3"
                                    className="mt-1 block w-full bg-gray-900 text-gray-200 shadow-sm sm:text-sm border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add your notes about this add-on..."
                                ></textarea>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ExtraAddOnsSection; 