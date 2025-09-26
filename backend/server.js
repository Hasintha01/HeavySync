// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./db.js";
import supplierRoutes from "./modules/supplier/routes/supplierRoutes.js";
import purchaseOrderRoutes from "./modules/supplier/routes/purchaseOrderRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestRateLimiter } from "./middleware/rateLimit.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(requestRateLimiter);

// DB
connectDB();

// routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchaseOrders", purchaseOrderRoutes);

// healthcheck
app.get("/api/health", (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || "dev" }));

// error handler (last)
app.use(errorHandler);

// start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));