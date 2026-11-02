const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Topic = require("./models/Topic");
const User = require("./models/User");
const sampleTopics = require("./sampleTopics");
const sampleAssessments = require("./sampleAssessments");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pathfinder_db";
const JWT_SECRET = process.env.JWT_SECRET || "pathfinder_jwt_secret_key_2026_super_secure";

app.use(cors());
app.use(express.json());

let isDbConnected = false;

// In-Memory User storage fallback when MongoDB is offline
const memoryUsers = {};

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 3000,
  })
  .then(async () => {
    isDbConnected = true;
    console.log("🟢 Connected to MongoDB database successfully.");
    
    // Auto seed if database has no topics yet
    const count = await Topic.countDocuments();
    if (count === 0) {
      console.log("Database empty. Seeding initial topics...");
      await Topic.insertMany(sampleTopics);
      console.log("Auto-seeding complete!");
    }
  })
  .catch((err) => {
    isDbConnected = false;
    console.log("🟡 MongoDB connection bypassed or unavailable. Using robust in-memory engine fallback.");
  });

// Helper function to map user goal string to normalized category
function normalizeCategory(goal) {
  if (!goal) return "ML";
  const g = goal.toLowerCase().trim();
  if (g.includes("gate")) return "GATE";
  if (g.includes("ml") || g.includes("machine") || g.includes("ai") || g.includes("artificial")) return "ML";
  if (g.includes("web") || g.includes("frontend") || g.includes("backend") || g.includes("fullstack") || g.includes("react")) return "Web Development";
  if (g.includes("data") || g.includes("analytics") || g.includes("stat")) return "Data Science";
  if (g.includes("cyber") || g.includes("security") || g.includes("hack") || g.includes("network")) return "Cybersecurity";
  return goal;
}

// Auth Middleware to verify JWT Token
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    if (isDbConnected) {
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Check memory fallback
    if (memoryUsers[decoded.id]) {
      const { password, ...userWithoutPass } = memoryUsers[decoded.id];
      req.user = userWithoutPass;
      return next();
    }

    res.status(401).json({ error: "Unauthorized: User not found" });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

// 1. Basic Health Check Endpoint
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "PATHFINDER Auth & Dynamic AI Engine Server is Running",
    database: isDbConnected ? "MongoDB Connected" : "In-Memory Auth & Engine Active",
    version: "2.5.0 (Full Authentication Supported)"
  });
});

// ==========================================
// --- AUTHENTICATION ENDPOINTS ---
// ==========================================

// Register New User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, background, learningPreferences } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required fields." });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDbConnected) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(400).json({ error: "User with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email: cleanEmail,
        password: hashedPassword,
        background: background || "Student",
        learningPreferences: learningPreferences || { hoursPerWeek: 5, preferredStyle: "Hands-on Projects" }
      });

      const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

      const userObj = newUser.toObject();
      delete userObj.password;

      return res.json({
        success: true,
        message: "Registration successful!",
        token,
        user: userObj
      });
    }

    // In-Memory Fallback Registration
    const existingMemory = Object.values(memoryUsers).find(u => u.email === cleanEmail);
    if (existingMemory) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const userId = "user_" + Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);

    const memUser = {
      _id: userId,
      id: userId,
      name,
      email: cleanEmail,
      password: hashedPassword,
      background: background || "Student",
      learningPreferences: learningPreferences || { hoursPerWeek: 5, preferredStyle: "Hands-on Projects" },
      activeGoal: "Web Development",
      activeLevel: "Beginner",
      completedTopics: [],
      createdAt: new Date()
    };

    memoryUsers[userId] = memUser;
    const token = jwt.sign({ id: userId, email: cleanEmail }, JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...userSafe } = memUser;
    res.json({
      success: true,
      message: "Registration successful (In-Memory Session)!",
      token,
      user: userSafe
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDbConnected) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      const userObj = user.toObject();
      delete userObj.password;

      return res.json({
        success: true,
        message: "Login successful!",
        token,
        user: userObj
      });
    }

    // In-Memory Fallback Login
    const memUser = Object.values(memoryUsers).find(u => u.email === cleanEmail);
    if (!memUser) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, memUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: memUser._id, email: cleanEmail }, JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...userSafe } = memUser;

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: userSafe
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Current Logged-in User Profile (Me)
app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Synchronize User Saved Progress (Completed Topics & Active Goal)
app.post("/api/user/sync-progress", authMiddleware, async (req, res) => {
  try {
    const { activeGoal, activeLevel, completedTopics, currentStage } = req.body;
    const userId = req.userId;

    if (isDbConnected) {
      const updated = await User.findByIdAndUpdate(
        userId,
        {
          ...(activeGoal && { activeGoal }),
          ...(activeLevel && { activeLevel }),
          ...(completedTopics && { completedTopics }),
          ...(currentStage && { currentStage })
        },
        { new: true }
      ).select("-password");

      return res.json({ success: true, user: updated });
    }

    if (memoryUsers[userId]) {
      if (activeGoal) memoryUsers[userId].activeGoal = activeGoal;
      if (activeLevel) memoryUsers[userId].activeLevel = activeLevel;
      if (completedTopics) memoryUsers[userId].completedTopics = completedTopics;
      if (currentStage) memoryUsers[userId].currentStage = currentStage;

      const { password: _, ...userSafe } = memoryUsers[userId];
      return res.json({ success: true, user: userSafe });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// --- CORE PATHFINDER ENGINE ENDPOINTS ---
// ==========================================

// Goal Categories Endpoint
app.get("/api/categories", (req, res) => {
  res.json([
    {
      id: "ML",
      title: "AI & Machine Learning Engineer",
      icon: "🧠",
      description: "Master algorithms, PyTorch deep learning, neural networks, computer vision, and model deployment.",
      demand: "High Demand (95%)",
      defaultLevel: "Beginner"
    },
    {
      id: "Web Development",
      title: "Fullstack Web Developer",
      icon: "🌐",
      description: "Build end-to-end modern web apps with React, JavaScript, Node.js, Express, databases, and secure APIs.",
      demand: "Very High (98%)",
      defaultLevel: "Beginner"
    },
    {
      id: "GATE",
      title: "GATE Preparation (CS & IT)",
      icon: "🎓",
      description: "Prepare for GATE CS/IT: Digital Logic, Data Structures, Operating Systems, Algorithms, and DBMS.",
      demand: "Competitive Exam",
      defaultLevel: "Beginner"
    },
    {
      id: "Data Science",
      title: "Data Scientist & Analytics Expert",
      icon: "📊",
      description: "Extract actionable insights using Pandas, SQL queries, statistical inference, and interactive visualization.",
      demand: "High Demand (92%)",
      defaultLevel: "Beginner"
    },
    {
      id: "Cybersecurity",
      title: "Cybersecurity & Ethical Hacking",
      icon: "🛡️",
      description: "Protect systems, master networking protocols, perform penetration testing, and secure web applications.",
      demand: "Critical Demand (96%)",
      defaultLevel: "Beginner"
    }
  ]);
});

// Diagnostic Assessment Questions Endpoint
app.get("/api/assessment/:goal/:level", (req, res) => {
  const { goal, level } = req.params;
  const category = normalizeCategory(goal);
  const targetLevel = level || "Beginner";

  const goalQuizzes = sampleAssessments[category] || sampleAssessments["ML"];
  const questions = goalQuizzes[targetLevel] || goalQuizzes["Beginner"] || [];

  res.json({
    category,
    level: targetLevel,
    count: questions.length,
    questions: questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      dimension: q.dimension
    }))
  });
});

// Assessment Evaluation Endpoint
app.post("/api/assessment/evaluate", (req, res) => {
  try {
    const { goal, level, answers } = req.body;
    const category = normalizeCategory(goal);
    const targetLevel = level || "Beginner";

    const goalQuizzes = sampleAssessments[category] || sampleAssessments["ML"];
    const pool = goalQuizzes[targetLevel] || goalQuizzes["Beginner"] || [];

    let correctCount = 0;
    const dimensionScores = {};
    const dimensionCounts = {};
    const detailedFeedback = [];

    pool.forEach(q => {
      const userAns = answers ? answers[q.id] : undefined;
      const isCorrect = userAns === q.correctIndex;
      if (isCorrect) correctCount++;

      const dim = q.dimension || "General";
      dimensionCounts[dim] = (dimensionCounts[dim] || 0) + 1;
      dimensionScores[dim] = (dimensionScores[dim] || 0) + (isCorrect ? 1 : 0);

      detailedFeedback.push({
        id: q.id,
        question: q.question,
        userAnswer: userAns !== undefined ? q.options[userAns] : "Unanswered",
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation,
        dimension: dim
      });
    });

    const totalQuestions = pool.length || 1;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const skillAnalysis = Object.keys(dimensionCounts).map(dim => {
      const scoreRatio = dimensionScores[dim] / dimensionCounts[dim];
      return {
        dimension: dim,
        score: Math.round(scoreRatio * 100),
        status: scoreRatio >= 0.8 ? "Mastered" : scoreRatio >= 0.5 ? "Moderate" : "Needs Focus"
      };
    });

    const skillGaps = [];
    if (scorePercentage < 60) {
      skillGaps.push({
        gapTopic: "Foundational Concepts & Math",
        severity: "High",
        recommendation: "Inject fundamental topic booster modules before advanced projects."
      });
    }
    if (scorePercentage < 80) {
      skillGaps.push({
        gapTopic: "Practical Hands-on Syntax",
        severity: "Medium",
        recommendation: "Add guided coding exercises & interactive playgrounds."
      });
    }
    if (skillGaps.length === 0) {
      skillGaps.push({
        gapTopic: "Advanced Architecture & Edge Cases",
        severity: "Low",
        recommendation: "Accelerate straight to real-world portfolio capstone projects!"
      });
    }

    res.json({
      success: true,
      quizScore: scorePercentage,
      correctCount,
      totalQuestions,
      skillAnalysis,
      skillGaps,
      detailedFeedback
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Personalized Engine Recommendation Endpoint
app.post("/api/engine/recommend", async (req, res) => {
  try {
    const {
      goal,
      level = "Beginner",
      quizScore = 75,
      prerequisites = [],
      completedTopics = [],
      learningPreferences = { timeCommitment: "5h/week", preferredStyle: "Hands-on Projects" }
    } = req.body;

    if (!goal) {
      return res.status(400).json({ error: "Goal is required" });
    }

    const category = normalizeCategory(goal);
    let matchedTopics = [];

    if (isDbConnected) {
      matchedTopics = await Topic.find({
        $or: [
          { category: category },
          { category: { $regex: new RegExp(goal, "i") } }
        ]
      }).sort({ order: 1 });

      if (matchedTopics.length === 0) {
        matchedTopics = await Topic.find().limit(10);
      }
    } else {
      matchedTopics = sampleTopics.filter(t => 
        t.category.toLowerCase() === category.toLowerCase() ||
        t.category.toLowerCase().includes(goal.toLowerCase()) ||
        goal.toLowerCase().includes(t.category.toLowerCase())
      );
      if (matchedTopics.length === 0) {
        matchedTopics = sampleTopics;
      }
    }

    const personalizedTopics = matchedTopics.map(t => {
      const isCompleted = completedTopics.includes(t.topic);
      let adjustedHours = t.estimatedHours || 5;
      if (quizScore > 85) {
        adjustedHours = Math.max(2, Math.round(adjustedHours * 0.8));
      }

      return {
        ...t.toObject ? t.toObject() : t,
        estimatedHours: adjustedHours,
        isCompleted,
        status: isCompleted ? "Completed" : "Recommended"
      };
    });

    let aggregatedResources = [];
    personalizedTopics.forEach(t => {
      if (t.resources && Array.isArray(t.resources)) {
        t.resources.forEach(r => {
          aggregatedResources.push({
            ...r,
            associatedTopic: t.topic
          });
        });
      }
    });

    if (learningPreferences.preferredStyle) {
      const prefStyle = learningPreferences.preferredStyle.toLowerCase();
      aggregatedResources.sort((a, b) => {
        const aMatch = a.type.toLowerCase().includes(prefStyle) || prefStyle.includes(a.type.toLowerCase());
        const bMatch = b.type.toLowerCase().includes(prefStyle) || prefStyle.includes(b.type.toLowerCase());
        return bMatch - aMatch;
      });
    }

    const aggregatedProjects = [];
    personalizedTopics.forEach(t => {
      if (t.project) {
        aggregatedProjects.push({
          ...t.project,
          associatedTopic: t.topic
        });
      }
    });

    const totalHours = personalizedTopics.reduce((sum, t) => sum + t.estimatedHours, 0);

    res.json({
      success: true,
      engineInputs: {
        goal,
        level,
        quizScore,
        prerequisites,
        completedTopicsCount: completedTopics.length,
        learningPreferences
      },
      personalizedRoadmap: {
        topics: personalizedTopics,
        resources: aggregatedResources,
        projects: aggregatedProjects
      },
      summary: {
        totalTopics: personalizedTopics.length,
        completedTopicsCount: personalizedTopics.filter(t => t.isCompleted).length,
        totalEstimatedHours: totalHours,
        readinessScore: Math.min(100, Math.round(quizScore * 0.4 + (completedTopics.length / Math.max(1, personalizedTopics.length)) * 60))
      }
    });
  } catch (err) {
    console.error("Engine recommend error:", err);
    res.status(500).json({ error: "Internal server error running Personalized Engine." });
  }
});

// Topic Quiz Evaluation Endpoint
app.post("/api/quiz/evaluate", (req, res) => {
  const { topicTitle, answers } = req.body;
  const targetTopic = sampleTopics.find(t => t.topic === topicTitle);

  if (!targetTopic || !targetTopic.topicQuiz) {
    return res.json({
      success: true,
      passed: true,
      score: 100,
      feedback: "Quiz completed successfully!"
    });
  }

  const quiz = targetTopic.topicQuiz;
  let correct = 0;
  const results = quiz.map((q, idx) => {
    const isCorrect = answers && answers[idx] === q.correctIndex;
    if (isCorrect) correct++;
    return {
      question: q.question,
      isCorrect,
      explanation: q.explanation
    };
  });

  const score = Math.round((correct / quiz.length) * 100);
  const passed = score >= 70;

  res.json({
    success: true,
    topicTitle,
    score,
    passed,
    results
  });
});

// Adaptive Updated Roadmap Endpoint
app.post("/api/engine/update-roadmap", (req, res) => {
  const { goal, level, completedTopics = [], lastQuizScore = 80 } = req.body;
  const category = normalizeCategory(goal);

  const matched = sampleTopics.filter(t => t.category === category);

  const updatedTopics = matched.map(t => {
    const isCompleted = completedTopics.includes(t.topic);
    return {
      ...t,
      isCompleted,
      status: isCompleted ? "Completed" : "Active Focus"
    };
  });

  const newlyUnlocked = updatedTopics.filter(t => !t.isCompleted).slice(0, 2).map(t => t.topic);
  const completionPercentage = Math.round((completedTopics.length / Math.max(1, updatedTopics.length)) * 100);

  res.json({
    success: true,
    message: "Dynamic Roadmap recalculated successfully based on latest progress & quiz performance!",
    adaptationHighlights: [
      `Progress updated to ${completionPercentage}% complete (${completedTopics.length}/${updatedTopics.length} topics).`,
      `Next recommended priority topics: ${newlyUnlocked.join(", ") || "All topics completed!"}`,
      `Engine optimized time estimates based on latest quiz score (${lastQuizScore}%).`
    ],
    updatedRoadmap: {
      topics: updatedTopics,
      completionPercentage
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 PATHFINDER Auth & Engine Server listening on port ${PORT}`);
});
