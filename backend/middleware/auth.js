// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // expected shape: { id, roles: [] }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const requireRole = (...allowedRoles) => (req, res, next) => {
  const roles = req.user?.roles || [];
  if (!allowedRoles.some(r => roles.includes(r))) return res.status(403).json({ message: "Forbidden" });
  next();
};