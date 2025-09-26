// scripts/generateToken.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const payload = {
  id: "dev-user-id",
  roles: ["admin","purchase"]
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
console.log("JWT (dev):", token);