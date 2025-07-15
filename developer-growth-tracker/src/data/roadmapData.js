export const bestPractices = {
    "HTML": ["Use semantic HTML5 elements (e.g., <header>, <nav>, <main>, <article>, <section>, <footer>)."],
    "CSS": ["Use a consistent naming convention (e.g., BEM, SMACSS) for classes."],
    "Tailwind CSS": ["Embrace utility-first approach; avoid writing custom CSS where Tailwind utilities suffice."],
    "JavaScript (ES6+)": ["Use `const` and `let` instead of `var`."],
    "React (with hooks)": ["Utilize functional components and React Hooks (useState, useEffect, useContext, useRef, useCallback, useMemo)."],
    "Git + GitHub": ["Commit frequently with descriptive and concise messages."],
    "Node.js + Express": ["Implement robust error handling middleware."],
    "MongoDB (or PostgreSQL)": ["Design schemas based on your application's data access patterns."],
    "JWT/Auth + Role-based Access": ["Securely store JWTs (e.g., in HttpOnly cookies for web apps)."],
    "Advanced React (context, reducers, file uploads, modals)": ["Master `useReducer` for complex state logic."],
    "Mongoose/PostgreSQL relationships": ["For MongoDB, understand embedding vs. referencing documents based on data access patterns."],
    "Testing (Jest or Vitest)": ["Write unit tests for individual functions and components."],
    "MVC/Service Layers": ["Separate concerns into Model (data), View (UI), and Controller (logic)."],
    "Postman, Swagger Docs": ["Use Postman collections to organize and test your API endpoints."],
    "System Design (scalability, caching, queues)": ["Understand horizontal vs. vertical scaling."],
    "Docker + CI/CD (GitHub Actions, Railway, or Render CI)": ["Containerize your applications using Docker for consistent environments."],
    "Microservices or Modular Architecture": ["Break down large applications into smaller, independent services."],
    "Cloud Storage (e.g., Cloudinary or AWS S3)": ["Integrate with cloud storage services for efficient and scalable file uploads (images, videos, documents)."],
    "GraphQL (optional)": ["Understand GraphQL schema definition language (SDL)."],
    "Websockets (Chat, Realtime features)": ["Understand the WebSocket protocol for full-duplex communication."],
    "OAuth / Google Login": ["Understand OAuth 2.0 flows (e.g., Authorization Code Grant)."],
    "Multilingual Support (i18n)": ["Implement internationalization (i18n) to support multiple languages."],
    "TypeScript": ["Understand static typing and its benefits for large-scale applications."],
    "Next.js (if you want SSR/static generation)": ["Understand Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR)."]
};

export const projectPrompts = {
    "Portfolio Website (UI polish with Tailwind + animations)": "Focus on responsive design, smooth animations, and showcasing your best projects. Did you optimize images for fast loading? Is the site accessible?",
    "CRUD App (e.g., Task Manager or Note App) — with React frontend, Node backend": "Did you implement proper input validation and sanitization on the backend? Is your API well-documented (even if just with Postman collections)? How did you handle errors?",
    "Personal Blog (Markdown or Rich Text editor, REST API)": "How did you handle content storage and retrieval? Did you implement any form of user authentication for creating/editing posts? Consider SEO best practices.",
    "Dashboard (Analytics or Admin Panel)": "Focus on data visualization and user experience. How did you secure access to sensitive data? Did you implement any filtering or sorting capabilities?",
    "Authenticated App (e.g., Forum, Blog CMS, or Mini-SaaS)": "How did you handle secure password storage (hashing and salting)? What strategies did you use for session management or token refreshing? Did you implement role-based access control?",
    "Team Collaboration Project (optional: open source or friend collab)": "How did you manage code contributions and conflicts using Git? Did you participate in code reviews? How did you communicate with your team?",
    "Health Monitoring System (your HRMS can grow into this)": "Consider data privacy and security. How would you handle real-time data updates? What kind of data visualizations would be most useful?",
    "VPN/Firewall App MVP (expand Pun Block into a real MVP)": "This is a complex project. Focus on the core functionality. How would you handle network interactions? What security considerations are paramount?",
    "Capstone: SaaS-style full-stack app with Auth, payments, dashboards": "This is your ultimate project. Did you consider scalability challenges and how you might address them? How did you approach system design before coding? What payment gateway did you integrate? How did you manage user subscriptions?"
};

export const roadmapTemplate = {
    id: "fullStackRoadmapV1",
    name: "Full Stack Developer Roadmap",
    description: "A tailored roadmap for professional growth...",
    phases: [
        {
            id: "phase1",
            name: "Phase 1: Foundation & Essentials",
            focus: "Master the basics, get confident building full-stack apps solo.",
            duration: "Weeks 1–8",
            toolsTopics: [
                "HTML", "CSS", "Tailwind CSS", "JavaScript (ES6+)", "React (with hooks)",
                "Git + GitHub", "Node.js + Express", "MongoDB (or PostgreSQL)"
            ],
            projects: [
                "Portfolio Website (UI polish with Tailwind + animations)",
                "CRUD App (e.g., Task Manager or Note App) — with React frontend, Node backend",
                "Personal Blog (Markdown or Rich Text editor, REST API)"
            ],
            milestones: [
                { id: "week1-2", name: "Week 1–2 Focus: React basics + Tailwind UI + Git", subTasks: ["Setup React project", "Learn basic Tailwind classes", "Initialize Git repo"] },
                { id: "week3-4", name: "Week 3–4 Focus: Node.js + REST API + MongoDB", subTasks: ["Setup Node.js server", "Create basic REST endpoints", "Connect to MongoDB"] },
                { id: "week5-6", name: "Week 5–6 Focus: Connect frontend + backend (basic CRUD)", subTasks: ["Fetch data from API", "Send data to API", "Implement create, read, update, delete"] },
                { id: "week7-8", name: "Week 7–8 Focus: Deploy to Vercel/Render + polish 1 solid full-stack project", subTasks: ["Deploy frontend to Vercel", "Deploy backend to Render", "Add final UI touches"] }
            ]
        },
        {
            id: "phase2",
            name: "Phase 2: Real-World Application",
            focus: "Build production-grade apps, team workflows, and scalable patterns.",
            duration: "Weeks 9–16",
            toolsTopics: [
                "JWT/Auth + Role-based Access", "Advanced React (context, reducers, file uploads, modals)",
                "Mongoose/PostgreSQL relationships", "Testing (Jest or Vitest)", "MVC/Service Layers",
                "Postman, Swagger Docs"
            ],
            projects: [
                "Dashboard (Analytics or Admin Panel)",
                "Authenticated App (e.g., Forum, Blog CMS, or Mini-SaaS)",
                "Team Collaboration Project (optional: open source or friend collab)"
            ],
            milestones: [
                { id: "week9-10", name: "Week 9–10 Focus: User Auth + Protected Routes", subTasks: ["Implement user registration/login", "Create protected API routes", "Add client-side route protection"] },
                { id: "week11-12", name: "Week 11–12 Focus: Relationships (Users ↔ Posts, etc.)", subTasks: ["Define database relationships", "Implement CRUD operations with relationships"] },
                { id: "week13-14", name: "Week 13–14 Focus: Testing + Reusable Backend Patterns", subTasks: ["Write unit tests for backend", "Implement MVC/Service layers"] },
                { id: "week15-16", name: "Week 15–16 Focus: Deploy full project with docs & UI polish", subTasks: ["Update API documentation", "Refine UI/UX of the application"] }
            ]
        },
        {
            id: "phase3",
            name: "Phase 3: Scale & Architecture Thinking",
            focus: "Think like a Systems Architect and senior developer.",
            duration: "Weeks 17–24",
            toolsTopics: [
                "System Design (scalability, caching, queues)", "Docker + CI/CD (GitHub Actions, Railway, or Render CI)",
                "Microservices or Modular Architecture", "Cloud Storage (e.g., Cloudinary or AWS S3)",
                "GraphQL (optional)", "Websockets (Chat, Realtime features)"
            ],
            projects: [
                "Health Monitoring System (your HRMS can grow into this)",
                "VPN/Firewall App MVP (expand Pun Block into a real MVP)",
                "Capstone: SaaS-style full-stack app with Auth, payments, dashboards"
            ],
            milestones: [
                { id: "week17-18", name: "Week 17–18 Focus: Dockerize backend + explore CI/CD", subTasks: ["Create Dockerfile for backend", "Set up basic CI/CD pipeline"] },
                { id: "week19-20", name: "Week 19–20 Focus: Add image uploads / storage", subTasks: ["Integrate with Cloudinary/AWS S3", "Implement file upload functionality"] },
                { id: "week21-22", name: "Week 21–22 Focus: Design a scalable system (even on paper)", subTasks: ["Sketch system architecture", "Identify potential bottlenecks"] },
                { id: "week23-24", name: "Week 23–24 Focus: Polish Capstone App + Document everything", subTasks: ["Finalize Capstone features", "Write comprehensive documentation"] }
            ]
        }
    ],
    extraAddOns: [
        "OAuth / Google Login", "Multilingual Support (i18n)", "TypeScript", "Next.js (if you want SSR/static generation)"
    ],
    outcomes: [
        "Build and deploy robust full-stack apps from scratch",
        "Plan scalable systems like a junior architect",
        "Join teams or startups confidently",
        "Pitch yourself as a product-focused developer"
    ]
}; 