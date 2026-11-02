const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Topic = require("./models/Topic");
const sampleTopics = require("./sampleTopics");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pathfinder_db";

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected!");

    // Clear existing topics
    await Topic.deleteMany({});
    console.log("Existing topics cleared.");

    // Insert new sample topics
    const createdTopics = await Topic.insertMany(sampleTopics);
    console.log(`Successfully seeded ${createdTopics.length} topics!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();
