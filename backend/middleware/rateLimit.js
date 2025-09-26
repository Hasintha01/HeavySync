// middleware/rateLimit.js
import rateLimit from "express-rate-limit";

const max = process.env.REQUEST_RATE_LIMIT ? Number(process.env.REQUEST_RATE_LIMIT) : 100;

export const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later."
});