// ============================================================
// MVC - CONTROLLER: Course Controller
// Handles: Get all courses, Get single course
// Route:   GET /api/courses
//          GET /api/courses/:id
// ============================================================
const Course = require("../models/Course");

// @desc    Get all available courses
// @route   GET /api/courses
// @access  Private
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ courseCode: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc    Get a course by ID
// @route   GET /api/courses/:id
// @access  Private
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = { getCourses, getCourseById };
