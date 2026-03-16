const express = require("express");
const router = express.Router();
const {
  loginStudent,
  getStudentProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// POST /api/auth/login  → Public
router.post("/login", loginStudent);

// GET /api/auth/profile → Private (requires JWT)
router.get("/profile", protect, getStudentProfile);

module.exports = router;
