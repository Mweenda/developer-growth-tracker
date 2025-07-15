import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useFirebase } from '../context/AuthContext';
import { roadmapTemplate } from '../data/roadmapData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PhaseSection from '../components/PhaseSection';
import ExtraAddOnsSection from '../components/ExtraAddOnsSection';
import LearningResourcesSection from '../components/LearningResourcesSection';

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

// Background icons for visual appeal
const backgroundIcons = [
    { name: 'React', d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.06c-4.444 0-8.06-3.616-8.06-8.06 0-4.444 3.616-8.06 8.06-8.06 4.444 0 8.06 3.616 8.06 8.06 0 4.444-3.616 8.06-8.06 8.06zm-1.81-1.39l-4.14-7.17 1.63-2.83 4.14 7.17-1.63 2.83zm3.62 0l-1.63-2.83 4.14-7.17 1.63 2.83-4.14 7.17zm1.81-2.07l-4.14-7.17 1.63-2.83 4.14 7.17-1.63 2.83z", color: "text-blue-500", style: { top: '10%', left: '15%', width: '10vw' } },
    { name: 'HTML5', d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18.06c4.444 0 8.06-3.616 8.06-8.06 0-4.444-3.616-8.06-8.06-8.06-4.444 0-8.06 3.616-8.06 8.06 0 4.444 3.616 8.06 8.06 8.06zm0-16.12c3.386 0 6.12 2.734 6.12 6.12 0 3.386-2.734 6.12-6.12 6.12-3.386 0-6.12-2.734-6.12-6.12 0-3.386 2.734-6.12 6.12-6.12zm0 10.2c2.25 0 4.08-1.83 4.08-4.08S14.25 7 12 7c-2.25 0-4.08 1.83-4.08 4.08s1.83 4.08 4.08 4.08z", color: "text-orange-500", style: { top: '25%', right: '10%', width: '8vw' } },
    { name: 'CSS3', d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18.06c4.444 0 8.06-3.616 8.06-8.06 0-4.444-3.616-8.06-8.06-8.06-4.444 0-8.06 3.616-8.06 8.06 0 4.444 3.616 8.06 8.06 8.06zm0-16.12c3.386 0 6.12 2.734 6.12 6.12 0 3.386-2.734 6.12-6.12 6.12-3.386 0-6.12-2.734-6.12-6.12 0-3.386 2.734-6.12 6.12-6.12zm0 10.2c2.25 0 4.08-1.83 4.08-4.08S14.25 7 12 7c-2.25 0-4.08 1.83-4.08 4.08s1.83 4.08 4.08 4.08z", color: "text-blue-600", style: { top: '45%', left: '5%', width: '12vw' } },
    { name: 'JavaScript', d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18.06c4.444 0 8.06-3.616 8.06-8.06 0-4.444-3.616-8.06-8.06-8.06-4.444 0-8.06 3.616-8.06 8.06 0 4.444 3.616 8.06 8.06 8.06zm0-16.12c3.386 0 6.12 2.734 6.12 6.12 0 3.386-2.734 6.12-6.12 6.12-3.386 0-6.12-2.734-6.12-6.12 0-3.386 2.734-6.12 6.12-6.12zm0 10.2c2.25 0 4.08-1.83 4.08-4.08S14.25 7 12 7c-2.25 0-4.08 1.83-4.08 4.08s1.83 4.08 4.08 4.08z", color: "text-yellow-400", style: { top: '60%', right: '15%', width: '9vw' } },
    { name: 'Node.js', d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18.06c4.444 0 8.06-3.616 8.06-8.06 0-4.444-3.616-8.06-8.06-8.06-4.444 0-8.06 3.616-8.06 8.06 0 4.444 3.616 8.06 8.06 8.06zm0-16.12c3.386 0 6.12 2.734 6.12 6.12 0 3.386-2.734 6.12-6.12 6.12-3.386 0-6.12-2.734-6.12-6.12 0-3.386 2.734-6.12 6.12-6.12zm0 10.2c2.25 0 4.08-1.83 4.08-4.08S14.25 7 12 7c-2.25 0-4.08 1.83-4.08 4.08s1.83 4.08 4.08 4.08z", color: "text-green-500", style: { top: '80%', left: '25%', width: '10vw' } },
];

// SVG Icon component
const SvgIcon = ({ d, color, size, ...props }) => (
    <svg
        className={`${color} ${size || 'w-full h-full'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d={d} />
    </svg>
);

const HomePage = ({ userId }) => {
    const { db, currentUser, auth } = useFirebase();
    const [userProgress, setUserProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('roadmap');

    const appId = "1:702920459092:web:e7f1faa286e89f02c07ec1";
    const userProgressDocRef = userId && db ? doc(db, `artifacts/${appId}/users/${userId}/userProgress/myRoadmapProgress`) : null;
    const publicRoadmapDocRef = db ? doc(db, `artifacts/${appId}/public/data/roadmaps/fullStackRoadmapV1`) : null;

    useEffect(() => {
        const setupPublicRoadmap = async () => {
            if (db && publicRoadmapDocRef) {
                try {
                    const docSnap = await getDoc(publicRoadmapDocRef);
                    if (!docSnap.exists()) {
                        console.log("Public roadmap template not found, setting it up...");
                        await setDoc(publicRoadmapDocRef, roadmapTemplate);
                        console.log("Public roadmap template set.");
                    }
                } catch (err) {
                    console.error("Error setting up public roadmap:", err);
                }
            }
        };
        setupPublicRoadmap();
    }, [db, publicRoadmapDocRef]);

    useEffect(() => {
        if (!userId || !db) {
            return;
        }
        const unsubscribe = onSnapshot(userProgressDocRef, async (docSnap) => {
            if (docSnap.exists()) {
                setUserProgress(docSnap.data());
            } else {
                const initialProgress = {
                    userId: userId,
                    roadmapId: roadmapTemplate.id,
                    phasesProgress: roadmapTemplate.phases.map(phase => ({
                        id: phase.id,
                        toolsTopicsProgress: phase.toolsTopics.map(tool => ({ name: tool, completed: false, confidence: '', notes: '' })),
                        projectsProgress: phase.projects.map(project => ({ name: project, status: 'Not Started', repoLink: '', notes: '' })),
                        milestonesProgress: phase.milestones.map(milestone => ({
                            id: milestone.id,
                            name: milestone.name,
                            completed: false,
                            subTasksProgress: milestone.subTasks.map(subTask => ({ name: subTask, completed: false }))
                        }))
                    })),
                    extraAddOnsProgress: roadmapTemplate.extraAddOns.map(addOn => ({ name: addOn, completed: false, notes: '' })),
                    learningResources: [],
                    lastUpdated: new Date().toISOString(),
                    appId: appId
                };
                try {
                    await setDoc(userProgressDocRef, initialProgress);
                    setUserProgress(initialProgress);
                } catch (err) {
                    console.error("Error creating user progress document:", err);
                    setError("Failed to initialize your progress. Please try again.");
                }
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching user progress:", err);
            setError("Failed to load your progress. Please check your connection.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId, db, userProgressDocRef]);

    const updateUserProgressInFirestore = async (updatedProgress) => {
        if (!db || !userId) {
            console.error("Firestore or User ID not available for update.");
            return;
        }
        try {
            await updateDoc(userProgressDocRef, {
                ...updatedProgress,
                lastUpdated: new Date().toISOString()
            });
            toast.success('Progress saved successfully!');
        } catch (err) {
            console.error("Error updating user progress:", err);
            toast.error('Failed to save progress. Please try again.');
            setError("Failed to save your progress. Please try again.");
        }
    };

    const handlePhaseProgressUpdate = (updatedPhase) => {
        const updatedPhases = userProgress.phasesProgress.map(p =>
            p.id === updatedPhase.id ? updatedPhase : p
        );
        const newProgress = { ...userProgress, phasesProgress: updatedPhases };
        setUserProgress(newProgress);
        updateUserProgressInFirestore(newProgress);
    };

    const handleAddOnUpdate = (updatedAddOn) => {
        const updatedAddOns = userProgress.extraAddOnsProgress.map(ao =>
            ao.name === updatedAddOn.name ? updatedAddOn : ao
        );
        const newProgress = { ...userProgress, extraAddOnsProgress: updatedAddOns };
        setUserProgress(newProgress);
        updateUserProgressInFirestore(newProgress);
    };

    const handleAddResource = (newResource) => {
        const updatedResources = [...userProgress.learningResources, newResource];
        const newProgress = { ...userProgress, learningResources: updatedResources };
        setUserProgress(newProgress);
        updateUserProgressInFirestore(newProgress);
        toast.success('Learning resource added successfully!');
    };

    const handleDeleteResource = (indexToDelete) => {
        const updatedResources = userProgress.learningResources.filter((_, idx) => idx !== indexToDelete);
        const newProgress = { ...userProgress, learningResources: updatedResources };
        setUserProgress(newProgress);
        updateUserProgressInFirestore(newProgress);
        toast.success('Learning resource deleted successfully!');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Failed to log out. Please try again.');
        }
    };

    const calculateOverallProgress = () => {
        if (!userProgress) return { total: 0, completed: 0, percentage: 0 };
        let totalItems = 0;
        let completedItems = 0;
        userProgress.phasesProgress.forEach(phase => {
            phase.toolsTopicsProgress.forEach(tool => { totalItems++; if (tool.completed) completedItems++; });
            phase.projectsProgress.forEach(project => { totalItems++; if (project.status === 'Completed') completedItems++; });
            phase.milestonesProgress.forEach(milestone => { totalItems++; if (milestone.completed) completedItems++; });
        });
        userProgress.extraAddOnsProgress.forEach(addOn => {
            totalItems++;
            if (addOn.completed) completedItems++;
        });
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        return { total: totalItems, completed: completedItems, percentage: percentage };
    };

    const overallProgress = calculateOverallProgress();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!userProgress) return <ErrorMessage message="Could not load user progress. Please refresh." />;

    return (
        <motion.div
            className="relative font-sans bg-gray-900 text-gray-100 min-h-screen p-4 sm:p-8 lg:p-12 transition-colors duration-500 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Icons Layer */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ filter: 'blur(2px)' }}>
                {backgroundIcons.map((icon, index) => (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{ ...icon.style }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, 360], transition: { duration: 20, repeat: Infinity, ease: "linear" } }}
                    >
                        <SvgIcon d={icon.d} className={icon.color} style={{ width: icon.style.width, height: icon.style.width }} />
                    </motion.div>
                ))}
            </div>

            {/* Main Content Layer */}
            <motion.div className="max-w-6xl mx-auto relative z-10">
                <header className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-10 flex flex-col sm:flex-row justify-between items-center border border-gray-700">
                    <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                        <motion.h1 
                            className="text-4xl font-extrabold text-blue-400 mb-1 cursor-pointer hover:text-blue-300 transition-colors duration-200"
                            onClick={() => setCurrentView('roadmap')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🚀 Growth Tracker
                        </motion.h1>
                        <span className="text-sm font-medium text-gray-400">
                            Logged in as: <span className="font-semibold text-gray-200">{currentUser?.displayName || currentUser?.email || 'User'}</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentView('roadmap')}
                                className={`px-5 py-2 rounded-xl font-medium transition duration-200 ease-in-out transform hover:scale-105 ${currentView === 'roadmap' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                Roadmap
                            </button>
                            <button
                                onClick={() => setCurrentView('dashboard')}
                                className={`px-5 py-2 rounded-xl font-medium transition duration-200 ease-in-out transform hover:scale-105 ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                Dashboard
                            </button>
                        </div>
                        <div className="bg-gray-700 rounded-xl px-4 py-2">
                            <span className="text-sm font-medium text-gray-300">Progress: </span>
                            <span className="text-lg font-bold text-blue-400">{overallProgress.percentage}%</span>
                        </div>
                        <motion.button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition duration-200 ease-in-out transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Logout
                        </motion.button>
                    </div>
                </header>

                {currentView === 'roadmap' ? (
                    <div className="space-y-8">
                        {userProgress.phasesProgress.map((phase, index) => (
                            <PhaseSection
                                key={phase.id}
                                phase={phase}
                                onUpdatePhaseProgress={handlePhaseProgressUpdate}
                            />
                        ))}
                        
                        <ExtraAddOnsSection
                            addOns={userProgress.extraAddOnsProgress}
                            onUpdateAddOn={handleAddOnUpdate}
                        />
                        
                        <LearningResourcesSection
                            resources={userProgress.learningResources}
                            onAddResource={handleAddResource}
                            onDeleteResource={handleDeleteResource}
                        />
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-200 mb-2">Overall Progress</h3>
                                <div className="text-4xl font-bold text-blue-400">{overallProgress.percentage}%</div>
                                <div className="text-sm text-gray-400 mt-2">
                                    {overallProgress.completed} of {overallProgress.total} items completed
                                </div>
                            </div>
                            {/* Add more dashboard widgets here */}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default HomePage; 