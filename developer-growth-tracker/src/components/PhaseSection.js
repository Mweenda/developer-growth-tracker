import React from 'react';
import { motion } from 'framer-motion';
import ToolTopicItem from './ToolTopicItem';
import ProjectItem from './ProjectItem';
import MilestoneItem from './MilestoneItem';

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

const PhaseSection = ({ phase, onUpdatePhaseProgress }) => {
    const handleToolTopicUpdate = (updatedToolTopic) => {
        const updatedToolsTopics = phase.toolsTopicsProgress.map(tt =>
            tt.name === updatedToolTopic.name ? updatedToolTopic : tt
        );
        onUpdatePhaseProgress({ ...phase, toolsTopicsProgress: updatedToolsTopics });
    };

    const handleProjectUpdate = (updatedProject) => {
        const updatedProjects = phase.projectsProgress.map(p =>
            p.name === updatedProject.name ? updatedProject : p
        );
        onUpdatePhaseProgress({ ...phase, projectsProgress: updatedProjects });
    };

    const handleMilestoneUpdate = (updatedMilestone) => {
        const updatedMilestones = phase.milestonesProgress.map(m =>
            m.id === updatedMilestone.id ? updatedMilestone : m
        );
        onUpdatePhaseProgress({ ...phase, milestonesProgress: updatedMilestones });
    };

    const calculatePhaseProgress = () => {
        let totalItems = 0;
        let completedItems = 0;
        
        phase.toolsTopicsProgress.forEach(tool => {
            totalItems++;
            if (tool.completed) completedItems++;
        });
        
        phase.projectsProgress.forEach(project => {
            totalItems++;
            if (project.status === 'Completed') completedItems++;
        });
        
        phase.milestonesProgress.forEach(milestone => {
            totalItems++;
            if (milestone.completed) completedItems++;
        });
        
        return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    };

    const phaseProgress = calculatePhaseProgress();

    return (
        <motion.div
            variants={containerVariants}
            className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-blue-400 mb-2">{phase.name}</h2>
                    <p className="text-gray-300 text-lg mb-2">{phase.focus}</p>
                    <p className="text-gray-400 text-sm">{phase.duration}</p>
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-8">
                    <div className="bg-gray-700 rounded-xl px-6 py-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">{phaseProgress}%</div>
                            <div className="text-sm text-gray-400">Phase Progress</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools & Topics Section */}
            <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
                    <span className="mr-3">🛠️</span>
                    Tools & Topics
                </h3>
                <div className="space-y-4">
                    {phase.toolsTopicsProgress.map((tool, index) => (
                        <ToolTopicItem
                            key={index}
                            item={tool}
                            onUpdate={handleToolTopicUpdate}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Projects Section */}
            <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
                    <span className="mr-3">📁</span>
                    Projects
                </h3>
                <div className="space-y-4">
                    {phase.projectsProgress.map((project, index) => (
                        <ProjectItem
                            key={index}
                            item={project}
                            onUpdate={handleProjectUpdate}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Milestones Section */}
            <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
                    <span className="mr-3">🎯</span>
                    Milestones
                </h3>
                <div className="space-y-4">
                    {phase.milestonesProgress.map((milestone, index) => (
                        <MilestoneItem
                            key={index}
                            item={milestone}
                            onUpdate={handleMilestoneUpdate}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PhaseSection; 