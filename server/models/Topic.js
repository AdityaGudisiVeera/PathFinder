const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedHours: {
    type: Number,
    default: 5,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  order: {
    type: Number,
    default: 1,
  },
  resources: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  documentation: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  project: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  topicQuiz: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

module.exports = mongoose.model("Topic", TopicSchema);
