const PurchaseOrder = require("../models/PurchaseOrder");
const Supplier = require("../models/Supplier");

// Create new purchase order
const createPurchaseOrder = async (req, res) => {
  try {
    const { supplier, items } = req.body;

    // Validate supplier
    const existingSupplier = await Supplier.findById(supplier);
    if (!existingSupplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    // Calculate totalAmount
    const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

    const newPO = await PurchaseOrder.create({ supplier, items, totalAmount });
    res.status(201).json(newPO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all purchase orders
const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate("supplier", "name contactEmail contactPhone");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single purchase order by ID
const getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id).populate(
      "supplier",
      "name contactEmail contactPhone"
    );
    if (!order) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update purchase order
const updatePurchaseOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete purchase order
const deletePurchaseOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res.status(200).json({ message: "Purchase order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
};