// ============================================================
// MVC - CONTROLLER: Auth Controller
// Handles: Student Login, Get Profile
// Route:   POST /api/auth/login
//          GET  /api/auth/profile
// ============================================================
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

// Generate a signed JWT token for the student
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Authenticate student & return token
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    return res
      .status(400)
      .json({ message: "Please provide Student ID and Password" });
  }

  try {
    // Step 1: Find student in DB by studentId
    const student = await Student.findOne({ studentId: studentId.trim() });

    if (!student) {
      return res
        .status(401)
        .json({ message: "Invalid Student ID or Password" });
    }

    // Step 2: Compare entered password with hashed password in DB
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid Student ID or Password" });
    }

    // Step 3: Return student data + JWT token
    res.json({
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      department: student.department,
      semester: student.semester,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc    Get logged-in student's profile
// @route   GET /api/auth/profile
// @access  Private
const getStudentProfile = async (req, res) => {
  res.json({
    _id: req.student._id,
    studentId: req.student.studentId,
    name: req.student.name,
    email: req.student.email,
    department: req.student.department,
    semester: req.student.semester,
  });
};

module.exports = { loginStudent, getStudentProfile };
