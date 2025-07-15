🚀 Developer Growth Tracker
A personalized full-stack developer roadmap and progress tracking application designed to help you monitor your learning journey, set milestones, and manage resources.

✨ Features
Personalized Roadmap: A structured roadmap with phases, tools/topics, projects, and milestones.

Progress Tracking: Mark tools/topics as completed, update project statuses (Not Started, In Progress, Completed, On Hold), and track milestone completion including sub-tasks.

Confidence Levels: Record your confidence level for each tool/topic (Beginner, Comfortable, Proficient).

Notes & Reflections: Add personal notes to tools/topics and projects for reflections, challenges, and key learnings.

Professional Growth Prompts: Get thought-provoking questions for each project to encourage deeper learning and professional development.

Learning Resources Management: Add, view, and delete external learning resources (articles, tutorials, courses) with titles, URLs, categories, and notes.

Interactive Dashboard: Visualize your overall progress and phase-specific progress with animated progress bars.

User Authentication: Secure user registration and login using Firebase Authentication (Email/Password).

Real-time Data Sync: Progress is saved and synced in real-time using Firebase Firestore.

Responsive Design: Optimized for various screen sizes (mobile, tablet, desktop).

Animated UI: Smooth transitions and animations powered by Framer Motion.

Dynamic Background Icons: Visually appealing background with animated tech stack icons (React, HTML, CSS, JavaScript, Node.js, Python, Docker, MongoDB, GitHub, Express.js).

🛠 Technologies Used
Frontend:

React.js

Tailwind CSS (for styling)

Framer Motion (for animations)

Backend/Database:

Firebase Authentication (for user management)

Firebase Firestore (for real-time NoSQL database)

Development Tools:

Node.js & npm (for package management)

Git & GitHub (for version control)

🚀 Setup and Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

A Google Firebase Project

1. Clone the Repository
git clone <repository-url>
cd developer-growth-tracker

2. Install Dependencies
npm install
# or
yarn install

3. Firebase Project Setup
Go to the Firebase Console and create a new project.

Add a web app to your Firebase project.

Enable Authentication:

In the Firebase Console, navigate to "Authentication" -> "Sign-in method".

Enable "Email/Password" provider.

Enable Firestore Database:

In the Firebase Console, navigate to "Firestore Database".

Click "Create database". Choose "Start in production mode" (you will set up security rules later). Select a location.

Firestore Security Rules: Set up the following rules to allow authenticated users to read and write their own data and read public roadmap data:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public roadmap data
    match /artifacts/{appId}/public/data/roadmaps/{roadmapId} {
      allow read: if request.auth != null;
    }

    // User-specific private data
    match /artifacts/{appId}/users/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

4. Configure Firebase in Your Application
The application expects Firebase configuration and authentication tokens to be provided by the environment. In a typical Canvas environment, these are automatically injected. If running locally, you might need to mock these or set up environment variables:

__app_id: The ID of your application (e.g., from your Canvas environment).

__firebase_config: A JSON string of your Firebase project's configuration (found in Firebase Console -> Project settings -> Your apps).

__initial_auth_token: An initial custom authentication token (usually provided by the environment for authenticated sessions).

Example of mocking for local development (NOT for production):

You might temporarily hardcode these values in src/App.js for local testing, but never commit sensitive keys or configurations to version control.

// src/App.js (for local development ONLY, replace with actual config)
const appId = 'your-app-id-from-canvas'; // e.g., 'my-growth-tracker-xyz'
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
const initialAuthToken = null; // Or a test token if you have one

5. Run the Application
npm start
# or
yarn start

This will open the application in your browser, usually at http://localhost:3000.

💡 Usage
Sign Up / Sign In: Create a new account or log in with existing credentials.

Explore Roadmap: Navigate through the different phases, tools, topics, projects, and milestones.

Track Progress:

Check off completed tools/topics and milestones.

Update project statuses.

Add notes and confidence levels.

Manage Resources: Use the "Learning Resources" section to add and track useful links.

View Dashboard: Switch to the "Dashboard" view to see a visual summary of your overall and phase-specific progress.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

📄 License
This project is open-source and available under the MIT License.
