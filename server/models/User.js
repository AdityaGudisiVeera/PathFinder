const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    default: "Student",
  },
  learningPreferences: {
    hoursPerWeek: { type: Number, default: 5 },
    preferredStyle: { type: String, default: "Hands-on Projects" },
    velocity: { type: String, default: "Balanced" },
  },
  activeGoal: {
    type: String,
    default: "Web Development",
  },
  activeLevel: {
    type: String,
    default: "Beginner",
  },
  completedTopics: {
    type: [String],
    default: [],
  },
  quizScores: {
    type: Map,
    of: Number,
    default: {},
  },
  currentStage: {
    type: String,
    default: "WELCOME",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
