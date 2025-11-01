// server.js
// Main entry point for HeavySync backend API
// Imports and uses all route modules, including user authentication
// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");


// Import routes
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const partRoutes = require("./routes/partRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables (quiet: true suppresses dotenv's informational log)
dotenv.config({ quiet: true });

// Validate critical environment variables
if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}

// Initialize Express
const app = express();

// Security Middleware
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all API routes
app.use("/api/", limiter);

// Stricter rate limiting for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again later.",
    skipSuccessfulRequests: true, // Don't count successful requests
});

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Parse JSON requests with size limit

// Connect to MongoDB
connectDB();

// Routes
// ...existing code...

// Example protected dashboard route (must be after app is initialized)
const auth = require('./middleware/auth');
app.get('/api/dashboard', auth, (req, res) => {
    // You can customize the dashboard data here
    res.json({
        message: `Welcome ${req.user.username}! This is your dashboard.`
    });
});
app.get("/", (req, res) => {
    res.send("HeavySync Backend Running!");
});


// Use routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/users", authLimiter, userRoutes); // Apply stricter rate limiting to auth routes

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 Handler - Must be after all routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    
    // Don't expose error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        ...(isDevelopment && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));