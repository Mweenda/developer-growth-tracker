# Developer Growth Tracker

A comprehensive full-stack development roadmap tracking application built with React, Firebase, and Tailwind CSS. Track your progress through different phases of becoming a full-stack developer with interactive milestones, projects, and learning resources.

## 🚀 Features

- **Interactive Roadmap**: Track progress through 3 phases of full-stack development
- **Project Management**: Monitor project status, repository links, and notes
- **Milestone Tracking**: Break down learning into manageable milestones with sub-tasks
- **Learning Resources**: Add and manage your learning resources
- **Real-time Sync**: Firebase integration for real-time data synchronization
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Authentication**: Secure user authentication with Firebase Auth

## 🏗️ Project Structure

The project has been refactored for better maintainability and deployment readiness:

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSpinner.js
│   ├── ErrorMessage.js
│   ├── ToolTopicItem.js
│   ├── ProjectItem.js
│   ├── MilestoneItem.js
│   ├── PhaseSection.js
│   ├── ExtraAddOnsSection.js
│   └── LearningResourcesSection.js
├── pages/              # Page components
│   ├── HomePage.js
│   ├── SignInPage.js
│   └── SignUpPage.js
├── context/            # React context providers
│   └── AuthContext.js
├── firebase/           # Firebase configuration
│   └── config.js
├── data/               # Static data and templates
│   └── roadmapData.js
└── __mocks__/          # Test mocks
    ├── firebase.js
    └── framer-motion.js
```

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication)
- **Testing**: Jest, React Testing Library
- **Code Quality**: Prettier, ESLint
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project setup

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd developer-growth-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root with your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start the development server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## 🧪 Testing

### Run tests

```bash
npm test
```

### Run tests with coverage

```bash
npm test -- --coverage --watchAll=false
```

### Run tests in watch mode

```bash
npm test -- --watch
```

## 📝 Code Quality

### Format code

```bash
npm run format
```

### Check code formatting

```bash
npm run format:check
```

## 🏗️ Build for Production

```bash
npm run build
```

## 🔧 Development Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run eject` - Eject from Create React App (irreversible)

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## 🔒 Security Features

- ✅ Firebase credentials moved to environment variables
- ✅ Secure authentication with Firebase Auth
- ✅ Firestore security rules (configure in Firebase Console)
- ✅ Input validation and sanitization
- ✅ HTTPS enforcement in production

## 🧪 Testing Strategy

- **Unit Tests**: Component rendering and user interactions
- **Integration Tests**: Authentication flow and data persistence
- **Mock Strategy**: Firebase services mocked to prevent external dependencies
- **Coverage**: Aim for >80% test coverage

## 📊 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

- Runs on push to main/develop branches
- Tests against Node.js 18.x and 20.x
- Checks code formatting with Prettier
- Runs all tests with coverage
- Builds the project
- Uploads coverage reports (optional)

## 🎯 Roadmap Phases

### Phase 1: Foundation & Essentials (Weeks 1-8)
- HTML, CSS, Tailwind CSS
- JavaScript (ES6+)
- React (with hooks)
- Git + GitHub
- Node.js + Express
- MongoDB (or PostgreSQL)

### Phase 2: Real-World Application (Weeks 9-16)
- JWT/Auth + Role-based Access
- Advanced React (context, reducers, file uploads, modals)
- Testing (Jest or Vitest)
- MVC/Service Layers
- Postman, Swagger Docs

### Phase 3: Scale & Architecture Thinking (Weeks 17-24)
- System Design (scalability, caching, queues)
- Docker + CI/CD
- Microservices or Modular Architecture
- Cloud Storage
- GraphQL (optional)
- WebSockets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- Framer Motion for animations
- React Testing Library for testing utilities

## 📞 Support

For support, email kawanga.m.christopher@gmail.com or create an issue in the repository.
