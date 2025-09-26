// modules/supplier/routes/purchaseOrderRoutes.js
import express from "express";
import {
  createPurchaseOrder,
  listPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  changePurchaseStatus,
  cancelPurchaseOrder,
  downloadPurchaseOrderPDF,
  submitQuotation,
  acceptQuotationAndCreatePO
} from "../controllers/purchaseOrderController.js";
import { authMiddleware, requireRole } from "../../../middleware/auth.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", listPurchaseOrders);
router.post("/", requireRole("admin", "purchase"), createPurchaseOrder);
router.get("/:id", getPurchaseOrder);
router.put("/:id", requireRole("admin", "purchase"), updatePurchaseOrder);
router.patch("/:id/status", requireRole("admin", "purchase"), changePurchaseStatus);
router.delete("/:id", requireRole("admin", "purchase"), cancelPurchaseOrder);

// PDF
router.get("/:id/pdf", requireRole("admin", "purchase"), downloadPurchaseOrderPDF);

// quotations
router.post("/:poId/quotations", requireRole("supplier", "purchase", "admin"), submitQuotation);
router.post("/:poId/quotations/:quotationIndex/accept", requireRole("admin", "purchase"), acceptQuotationAndCreatePO);

export default router;