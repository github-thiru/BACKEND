// routes/authRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Correct way: import named functions from controller
const authController = require("../controllers/authController");

// 🔍 Check if these are functions
console.log("👀 Register type:", typeof authController.register);
console.log("👀 Login type:", typeof authController.login);

// ✅ Use correct references
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
