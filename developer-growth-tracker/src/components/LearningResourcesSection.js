import React, { useState } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const LearningResourcesSection = ({ resources, onAddResource, onDeleteResource }) => {
    const [newResource, setNewResource] = useState({ title: '', url: '', description: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAdd = () => {
        if (newResource.title && newResource.url) {
            onAddResource({
                ...newResource,
                id: Date.now(),
                addedAt: new Date().toISOString()
            });
            setNewResource({ title: '', url: '', description: '' });
            setShowAddForm(false);
        }
    };

    const handleDelete = (indexToDelete) => {
        onDeleteResource(indexToDelete);
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-400 flex items-center">
                    <span className="mr-3">📚</span>
                    Learning Resources
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-105"
                >
                    {showAddForm ? 'Cancel' : 'Add Resource'}
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-700 rounded-xl p-6 mb-6 border border-gray-600"
                >
                    <h3 className="text-xl font-semibold text-gray-200 mb-4">Add New Resource</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                            <input
                                type="text"
                                value={newResource.title}
                                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                className="w-full bg-gray-900 text-gray-200 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                placeholder="e.g., React Documentation"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">URL *</label>
                            <input
                                type="url"
                                value={newResource.url}
                                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                                className="w-full bg-gray-900 text-gray-200 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                value={newResource.description}
                                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                                rows="3"
                                className="w-full bg-gray-900 text-gray-200 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                placeholder="Brief description of the resource..."
                            ></textarea>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleAdd}
                                disabled={!newResource.title || !newResource.url}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                            >
                                Add Resource
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="space-y-4">
                {resources.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-lg">No learning resources added yet.</p>
                        <p className="text-gray-500 text-sm mt-2">Click "Add Resource" to get started!</p>
                    </div>
                ) : (
                    resources.map((resource, index) => (
                        <motion.div
                            key={resource.id || index}
                            variants={itemVariants}
                            className="bg-gray-700 p-5 rounded-xl shadow-md border border-gray-600 hover:border-blue-500 transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                        >
                                            {resource.title}
                                        </a>
                                    </h3>
                                    {resource.description && (
                                        <p className="text-gray-400 text-sm mb-2">{resource.description}</p>
                                    )}
                                    <p className="text-gray-500 text-xs">
                                        Added: {new Date(resource.addedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="ml-4 text-red-400 hover:text-red-300 transition-colors duration-200"
                                    title="Delete resource"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default LearningResourcesSection; 