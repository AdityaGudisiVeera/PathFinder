# PathFinder

PathFinder is an intelligent learning path and topic recommendation platform designed to help learners discover, navigate, and master key topics with tailored assessments and recommendations.

## Project Structure

```
PathFinder/
├── client/          # Frontend application (React + Vite)
└── server/          # Backend API (Node.js, Express, MongoDB)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a MongoDB Atlas connection URI)

---

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pathfinder_db
   ```
4. Seed sample topics/assessments (optional):
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local server URL (typically `http://localhost:5173`).
