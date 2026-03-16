const express = require("express");
const router = express.Router();
const {
  registerCourse,
  getMyRegistrations,
  dropCourse,
} = require("../controllers/registrationController");
const { protect } = require("../middleware/auth");

// POST   /api/registrations      → Register for a course (Private)
router.post("/", protect, registerCourse);

// GET    /api/registrations/my   → Get my registrations (Private)
router.get("/my", protect, getMyRegistrations);

// DELETE /api/registrations/:id  → Drop a course (Private)
router.delete("/:id", protect, dropCourse);

module.exports = router;
