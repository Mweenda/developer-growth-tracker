import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectPrompts } from '../data/roadmapData';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProjectItem = ({ item, onUpdate }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [status, setStatus] = useState(item.status || 'Not Started');
    const [repoLink, setRepoLink] = useState(item.repoLink || '');
    const [notes, setNotes] = useState(item.notes || '');

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        onUpdate({ ...item, status: newStatus });
    };
    const handleRepoLinkChange = (e) => {
        const newLink = e.target.value;
        setRepoLink(newLink);
        onUpdate({ ...item, repoLink: newLink });
    };
    const handleNotesChange = (e) => {
        const newNotes = e.target.value;
        setNotes(newNotes);
        onUpdate({ ...item, notes: newNotes });
    };

    const getStatusStyle = (currentStatus) => {
        switch (currentStatus) {
            case 'Completed': return { text: 'bg-green-600 text-green-50', icon: 'M5 13l4 4L19 7' };
            case 'In Progress': return { text: 'bg-blue-600 text-blue-50', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' };
            case 'On Hold': return { text: 'bg-yellow-600 text-yellow-50', icon: 'M20 7L4 7m16 4L4 11m16 4L4 15' };
            case 'Not Started': return { text: 'bg-gray-600 text-gray-50', icon: 'M12 6v.01M12 10v.01M12 14v.01' };
            default: return { text: 'bg-gray-600 text-gray-50', icon: 'M12 6v.01M12 10v.01M12 14v.01' };
        }
    };

    const statusStyle = getStatusStyle(status);

    return (
        <motion.div variants={itemVariants} className="bg-gray-800 p-5 rounded-xl shadow-md mb-4 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <div className="flex items-center">
                    <span className={`flex items-center space-x-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyle.text}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusStyle.icon}></path>
                        </svg>
                        <span>{status}</span>
                    </span>
                    <span className={`ml-4 text-lg font-medium ${status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {item.name}
                    </span>
                </div>
                <svg className={`w-6 h-6 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {showDetails && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-400">Status:</label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="mt-1 block w-full px-3 py-2 text-base bg-gray-900 text-gray-200 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-400 mt-3">Repository Link:</label>
                    <input
                        type="url"
                        value={repoLink}
                        onChange={handleRepoLinkChange}
                        className="mt-1 block w-full bg-gray-900 text-gray-200 shadow-sm sm:text-sm border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., https://github.com/your-username/your-project"
                    />
                    <label className="block text-sm font-medium text-gray-400 mt-3">Notes:</label>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        rows="3"
                        className="mt-1 block w-full bg-gray-900 text-gray-200 shadow-sm sm:text-sm border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add your notes, challenges, or key learnings here..."
                    ></textarea>
                    {projectPrompts[item.name] && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-300">Professional Growth Prompt:</h4>
                            <p className="text-sm text-gray-400 mt-2 italic">{projectPrompts[item.name]}</p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ProjectItem; 