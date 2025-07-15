import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bestPractices } from '../data/roadmapData';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const ToolTopicItem = ({ item, onUpdate }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [confidence, setConfidence] = useState(item.confidence || '');
    const [notes, setNotes] = useState(item.notes || '');

    const handleCheckboxChange = (e) => onUpdate({ ...item, completed: e.target.checked });
    const handleConfidenceChange = (e) => {
        const newConfidence = e.target.value;
        setConfidence(newConfidence);
        onUpdate({ ...item, confidence: newConfidence });
    };
    const handleNotesChange = (e) => {
        const newNotes = e.target.value;
        setNotes(newNotes);
        onUpdate({ ...item, notes: newNotes });
    };

    return (
        <motion.div variants={itemVariants} className="bg-gray-800 p-5 rounded-xl shadow-md mb-4 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-6 w-6 text-blue-500 rounded-md focus:ring-blue-400"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`ml-4 text-lg font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {item.name}
                    </span>
                </div>
                <svg className={`w-6 h-6 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {showDetails && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-400">Confidence Level:</label>
                    <select
                        value={confidence}
                        onChange={handleConfidenceChange}
                        className="mt-1 block w-full px-3 py-2 text-base bg-gray-900 text-gray-200 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    >
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Comfortable">Comfortable</option>
                        <option value="Proficient">Proficient</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-400 mt-3">Notes:</label>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        rows="3"
                        className="mt-1 block w-full bg-gray-900 text-gray-200 shadow-sm sm:text-sm border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add your notes here..."
                    ></textarea>
                    {bestPractices[item.name] && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-300">Best Practices:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                                {bestPractices[item.name].map((bp, idx) => (
                                    <li key={idx} className="mb-1">{bp}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ToolTopicItem; 