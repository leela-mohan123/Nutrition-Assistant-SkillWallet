# Nutrition-Assistant-SkillWallet
 Nutrition Assistant Application (Full Stack Development Project)
Overview
The Nutrition Assistant Application is a full-stack web application designed to help users track, manage, and improve their dietary habits. It provides a structured way to monitor meals, analyze nutrition intake, and maintain a healthy lifestyle using a modern and scalable architecture.

This project demonstrates strong full-stack development skills, including frontend UI design, backend API development, database management, and secure authentication — making it placement-ready and industry-relevant.

🚀 Key Features
👤 User Management
Secure user registration and login
Password hashing using bcrypt
JWT-based authentication for protected routes
🍽️ Meal Tracking
Add, update, and delete meals
Store meal details with nutritional information
View personal meal history
📊 Nutrition Monitoring
Track calorie intake and meal patterns
Structured data storage for easy analysis
🔐 Security
Token-based authentication (JWT)
Protected APIs with middleware
Environment variable configuration
🎨 Frontend Experience
Responsive UI built with React + Tailwind CSS
Smooth animations using Framer Motion
Notifications with React Toastify
Client-side routing using React Router
🏗️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
React Router DOM
Framer Motion
Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcryptjs
📂 Project Structure
Nutrition Assistant Application/
│
├── frontend/        # React Application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/         # Node.js + Express Server
│   ├── config/      # Database configuration
│   ├── controllers/ # Business logic
│   ├── models/      # Mongoose schemas
│   ├── middleware/  # Auth middleware
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repo-link>
cd Nutrition-Assistant
2️⃣ Backend Setup
cd backend
npm install
Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the backend:

node server.js
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔗 API Endpoints (Sample)
Authentication
POST /api/auth/register → Register user
POST /api/auth/login → Login user
Meals
GET /api/meals → Get user meals
POST /api/meals → Add meal
PUT /api/meals/:id → Update meal
DELETE /api/meals/:id → Delete meal
🧠 Concepts Demonstrated
RESTful API Design
MVC Architecture
Authentication & Authorization
State Management in React
API Integration (Axios)
Responsive UI/UX Design
Secure Backend Development
📈 Future Enhancements
AI-based diet recommendations
Calorie prediction system
Graphical analytics dashboard
Mobile app integration
Third-party nutrition API integration
💼 Why This Project is Placement-Ready
Covers end-to-end full-stack development
Implements real-world authentication systems
Demonstrates clean architecture (MVC pattern)
Uses industry-standard technologies
Shows ability to build scalable and secure applications
