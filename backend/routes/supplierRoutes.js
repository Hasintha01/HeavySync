// supplierRoutes.js
// Defines supplier-related API routes for HeavySync backend
// Some routes are protected by JWT authentication middleware
// Import express
const express = require("express");

// Import controller functions
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} = require("../controllers/supplierController");


const auth = require('../middleware/auth');
// Create a router
const router = express.Router();

// Routes mapping

// Create a new supplier (protected)
router.post("/", auth, createSupplier);

// Get all suppliers
router.get("/", getSuppliers);

// Get a supplier by ID
router.get("/:id", getSupplierById);

// Update a supplier by ID (protected)
router.put("/:id", auth, updateSupplier);

// Delete a supplier by ID (protected)
router.delete("/:id", auth, deleteSupplier);

// Export router to use in server.js
module.exports = router;