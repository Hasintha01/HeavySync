// Import mongoose
const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
        try {
                await mongoose.connect(process.env.MONGO_URI, {
                        autoIndex: true, // Build indexes automatically (disable in production if you use migrations)
                        serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
                });
                console.log("MongoDB Connected Successfully!");
        } catch (error) {
                console.error("MongoDB Connection Failed:", error.message);
                process.exit(1); // Stop server on failure
        }
};

module.exports = connectDB;