// modules/supplier/models/Supplier.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true, trim: true },
  contactPerson: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  category: { type: String, trim: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

supplierSchema.index({ supplierName: "text", category: 1 });

export default mongoose.model("Supplier", supplierSchema);