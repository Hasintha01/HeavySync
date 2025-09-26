// modules/supplier/routes/supplierRoutes.js
import express from "express";
import {
  createSupplier,
  listSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplierController.js";
import { authMiddleware, requireRole } from "../../../middleware/auth.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", listSuppliers);
router.post("/", requireRole("admin", "purchase"), createSupplier);

router.get("/:id", getSupplier);
router.put("/:id", requireRole("admin", "purchase"), updateSupplier);
router.delete("/:id", requireRole("admin"), deleteSupplier);

export default router;