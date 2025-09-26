// modules/supplier/controllers/purchaseOrderController.js
import PurchaseOrder from "../models/PurchaseOrder.js";
import Supplier from "../models/Supplier.js";
import axios from "axios";
import {
  purchaseCreateSchema,
  changeStatusSchema,
  quotationSchema
} from "../validations/supplierValidation.js";
import { computeOrderTotal, computeLineTotal } from "../../../utils/compute.js";
import { generatePurchaseOrderPDF } from "../utils/pdfGenerator.js";
import logger from "../../../utils/logger.js";

const inventoryApi = process.env.INVENTORY_API;
const serviceToken = process.env.SERVICE_TOKEN;

// Create PO
export const createPurchaseOrder = async (req, res, next) => {
  try {
    const { error, value } = purchaseCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const supplierExists = await Supplier.findById(value.supplier);
    if (!supplierExists) return res.status(400).json({ message: "Invalid supplier" });

    const itemsWithTotals = value.items.map(it => ({ ...it, total: computeLineTotal(it) }));
    const totalCost = computeOrderTotal(itemsWithTotals);

    const po = new PurchaseOrder({
      supplier: value.supplier,
      items: itemsWithTotals,
      totalCost,
      expectedDeliveryDate: value.expectedDeliveryDate,
      notes: value.notes,
      createdBy: req.user?.id
    });
    await po.save();
    res.status(201).json(po);
  } catch (err) { next(err); }
};

// List POs
export const listPurchaseOrders = async (req, res, next) => {
  try {
    const { supplier, status, fromDate, toDate, page = 1, limit = 25, q } = req.query;
    const filter = {};
    if (supplier) filter.supplier = supplier;
    if (status) filter.status = status;
    if (q) filter["items.itemName"] = { $regex: q, $options: "i" };
    if (fromDate || toDate) filter.createdAt = {};
    if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    if (toDate) filter.createdAt.$lte = new Date(toDate);

    const pos = await PurchaseOrder.find(filter)
      .populate("supplier")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await PurchaseOrder.countDocuments(filter);
    res.json({ data: pos, meta: { page: Number(page), limit: Number(limit), total } });
  } catch (err) { next(err); }
};

// Get single PO
export const getPurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id).populate("supplier");
    if (!po) return res.status(404).json({ message: "Purchase order not found" });
    res.json(po);
  } catch (err) { next(err); }
};

// Update PO (only when pending)
export const updatePurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id);
    if (!po) return res.status(404).json({ message: "Not found" });
    if (po.status !== "pending") return res.status(400).json({ message: "Only pending POs can be edited" });

    const { error, value } = purchaseCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const itemsWithTotals = value.items.map(it => ({ ...it, total: computeLineTotal(it) }));
    const totalCost = computeOrderTotal(itemsWithTotals);

    po.supplier = value.supplier;
    po.items = itemsWithTotals;
    po.totalCost = totalCost;
    po.expectedDeliveryDate = value.expectedDeliveryDate;
    po.notes = value.notes;
    await po.save();
    res.json(po);
  } catch (err) { next(err); }
};

// Change status
export const changePurchaseStatus = async (req, res, next) => {
  try {
    const { error, value } = changeStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { status } = value;

    const po = await PurchaseOrder.findById(req.params.id);
    if (!po) return res.status(404).json({ message: "PO not found" });

    if (po.status === "received" && status !== "received") {
      return res.status(400).json({ message: "Cannot change status from received to other" });
    }

    if (status === "received" && po.status !== "received") {
      po.status = "received";
      po.receivedAt = new Date();
      // call inventory endpoint for each item (if API provided)
      if (inventoryApi) {
        try {
          for (const it of po.items) {
            await axios.post(`${inventoryApi}/api/inventory/increment`, {
              productId: it.productId,
              productName: it.itemName,
              quantity: it.quantity
            }, { headers: { Authorization: `Bearer ${serviceToken}` }, timeout: 5000 });
          }
          po.inventorySync = "done";
        } catch (err) {
          logger.error("Inventory update failed", { err: err.message });
          po.inventorySync = "failed";
          po.notes = `${po.notes || ""}\nInventory update failed at ${new Date().toISOString()}`;
        }
      }
    } else {
      po.status = status;
    }

    await po.save();
    res.json(po);
  } catch (err) { next(err); }
};

// Cancel PO (soft)
export const cancelPurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id);
    if (!po) return res.status(404).json({ message: "Not found" });
    if (po.status === "received") return res.status(400).json({ message: "Cannot cancel received order" });
    po.status = "cancelled";
    await po.save();
    res.json({ message: "Cancelled", po });
  } catch (err) { next(err); }
};

// Download PDF
export const downloadPurchaseOrderPDF = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id).populate("supplier");
    if (!po) return res.status(404).json({ message: "Not found" });
    const pdfBuffer = await generatePurchaseOrderPDF(po, po.supplier || {});
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename="${po.orderId}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) { next(err); }
};

// Submit quotation to an existing PO
export const submitQuotation = async (req, res, next) => {
  try {
    const { error, value } = quotationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { poId } = req.params;
    const po = await PurchaseOrder.findById(poId);
    if (!po) return res.status(404).json({ message: "PO not found" });

    const quotation = {
      supplierId: value.supplierId,
      items: value.items.map(it => ({ ...it, total: computeLineTotal(it) })),
      total: computeOrderTotal(value.items),
      quotedAt: new Date(),
      notes: value.notes
    };

    po.quotations.push(quotation);
    await po.save();
    res.status(201).json({ message: "Quotation submitted", quotation });
  } catch (err) { next(err); }
};

// Accept quotation (create new PO)
export const acceptQuotationAndCreatePO = async (req, res, next) => {
  try {
    const { poId, quotationIndex } = req.params;
    const po = await PurchaseOrder.findById(poId);
    if (!po) return res.status(404).json({ message: "PO not found" });

    const idx = Number(quotationIndex);
    if (!po.quotations || idx < 0 || idx >= po.quotations.length) {
      return res.status(400).json({ message: "Invalid quotation index" });
    }

    const q = po.quotations[idx];
    const newPO = new PurchaseOrder({
      supplier: q.supplierId,
      items: q.items.map(it => ({ ...it, total: computeLineTotal(it) })),
      totalCost: q.total || computeOrderTotal(q.items),
      status: "approved",
      createdBy: req.user?.id,
      notes: `Created from accepted quotation of PO ${po.orderId}`
    });
    await newPO.save();
    res.status(201).json({ message: "Purchase order created from quotation", purchaseOrder: newPO });
  } catch (err) { next(err); }
};