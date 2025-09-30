// Import mongoose to define the schema
const mongoose = require("mongoose");

// Define Supplier Schema
const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // Name is mandatory
            trim: true,     // Remove extra spaces
        },
        contactEmail: {
            type: String,
            required: true,
            unique: true,   // No duplicate emails allowed
        },
        contactPhone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

// Create Supplier model using the schema
const Supplier = mongoose.model("Supplier", supplierSchema);

// Export the model for use in controllers
module.exports = Supplier;