// modules/supplier/models/PurchaseOrder.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem", required: false },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 }
}, { _id: false });

const quotationSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  quotedAt: Date,
  items: [itemSchema],
  total: Number,
  notes: String
}, { _id: false });

const purchaseOrderSchema = new mongoose.Schema({
  orderId: { type: String, default: () => `PO-${uuidv4().split("-")[0]}`, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  items: { type: [itemSchema], default: [] },
  totalCost: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ["pending", "approved", "received", "cancelled"], default: "pending" },
  expectedDeliveryDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quotations: { type: [quotationSchema], default: [] },
  notes: String,
  inventorySync: { type: String, enum: ["pending", "done", "failed"], default: "pending" }
}, { timestamps: true });

purchaseOrderSchema.index({ orderId: 1 });
purchaseOrderSchema.index({ createdAt: -1 });

export default mongoose.model("PurchaseOrder", purchaseOrderSchema);