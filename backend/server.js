// server.js
// Main entry point for HeavySync backend API
// Imports and uses all route modules, including user authentication
// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


// Import routes
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const partRoutes = require("./routes/partRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables (quiet: true suppresses dotenv's informational log)
dotenv.config({ quiet: true });

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

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
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));