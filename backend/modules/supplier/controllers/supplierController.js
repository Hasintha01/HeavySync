// modules/supplier/controllers/supplierController.js
import Supplier from "../models/Supplier.js";
import { supplierCreateSchema } from "../validations/supplierValidation.js";

export const createSupplier = async (req, res, next) => {
  try {
    const { error, value } = supplierCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existing = await Supplier.findOne({ supplierName: value.supplierName });
    if (existing) return res.status(400).json({ message: "Supplier with same name exists" });

    const s = new Supplier(value);
    await s.save();
    res.status(201).json(s);
  } catch (err) { next(err); }
};

export const listSuppliers = async (req, res, next) => {
  try {
    const { q, category, status, page = 1, limit = 25 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (status) filter.status = status;

    const suppliers = await Supplier.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Supplier.countDocuments(filter);
    res.json({ data: suppliers, meta: { page: Number(page), limit: Number(limit), total } });
  } catch (err) { next(err); }
};

export const getSupplier = async (req, res, next) => {
  try {
    const s = await Supplier.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Supplier not found" });
    res.json(s);
  } catch (err) { next(err); }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const { error, value } = supplierCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const s = await Supplier.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ message: "Supplier not found" });
    res.json(s);
  } catch (err) { next(err); }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    // soft delete recommended: set status inactive
    const s = await Supplier.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Supplier not found" });
    s.status = "inactive";
    await s.save();
    res.status(200).json({ message: "Supplier deactivated" });
  } catch (err) { next(err); }
};