const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
} = require("../controllers/courseController");
const { protect } = require("../middleware/auth");

// GET /api/courses      → Private
router.get("/", protect, getCourses);

// GET /api/courses/:id  → Private
router.get("/:id", protect, getCourseById);

module.exports = router;
