import React, { useState } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const MilestoneItem = ({ item, onUpdate }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleMilestoneCheckboxChange = (e) => {
        const newCompleted = e.target.checked;
        const updatedSubTasks = item.subTasksProgress.map(st => ({ ...st, completed: newCompleted }));
        onUpdate({ ...item, completed: newCompleted, subTasksProgress: updatedSubTasks });
    };

    const handleSubTaskCheckboxChange = (subTaskName, e) => {
        const newSubTasksProgress = item.subTasksProgress.map(st =>
            st.name === subTaskName ? { ...st, completed: e.target.checked } : st
        );
        const allSubTasksCompleted = newSubTasksProgress.every(st => st.completed);
        onUpdate({ ...item, completed: allSubTasksCompleted, subTasksProgress: newSubTasksProgress });
    };

    return (
        <motion.div variants={itemVariants} className="bg-gray-800 p-5 rounded-xl shadow-md mb-4 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={handleMilestoneCheckboxChange}
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
                    <h4 className="text-md font-semibold text-gray-300 mb-3">Sub-tasks:</h4>
                    <div className="space-y-2">
                        {item.subTasksProgress.map((subTask, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={subTask.completed}
                                    onChange={(e) => handleSubTaskCheckboxChange(subTask.name, e)}
                                    className="form-checkbox h-5 w-5 text-blue-500 rounded-md focus:ring-blue-400"
                                />
                                <span className={`ml-3 text-sm ${subTask.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                                    {subTask.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default MilestoneItem; 