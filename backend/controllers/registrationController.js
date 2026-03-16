// ============================================================
// MVC - CONTROLLER: Registration Controller
// Handles: Register for course, Get my registrations, Drop course
// Route:   POST   /api/registrations
//          GET    /api/registrations/my
//          DELETE /api/registrations/:id
// ============================================================
const Registration = require("../models/Registration");
const Course = require("../models/Course");

// @desc    Register a student for a course (core use case)
// @route   POST /api/registrations
// @access  Private
const registerCourse = async (req, res) => {
  const { courseId, semester } = req.body;

  if (!courseId || !semester) {
    return res
      .status(400)
      .json({ message: "Course and semester are required" });
  }

  try {
    // Step 1: Verify the course exists in DB
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Step 2: Check if student is already registered for this course
    const existing = await Registration.findOne({
      student: req.student._id,
      course: courseId,
      status: "active",
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You are already registered for this course" });
    }

    // Step 3: Check if the course has available seats
    if (course.enrolled >= course.capacity) {
      return res
        .status(400)
        .json({ message: "Course is full. No seats available" });
    }

    // Step 4: Create the registration record in DB
    const registration = await Registration.create({
      student: req.student._id,
      course: courseId,
      studentId: req.student.studentId,
      courseCode: course.courseCode,
      semester,
    });

    // Step 5: Increment enrolled count for the course
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolled: 1 } });

    // Step 6: Return populated registration data
    const populated = await Registration.findById(registration._id).populate(
      "course",
      "courseCode courseName instructor credits schedule department",
    );

    res.status(201).json({
      message: `Successfully registered for ${course.courseName}`,
      registration: populated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc    Get all active registrations for the logged-in student
// @route   GET /api/registrations/my
// @access  Private
const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      student: req.student._id,
      status: "active",
    }).populate(
      "course",
      "courseCode courseName instructor credits schedule department",
    );

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc    Drop a registered course
// @route   DELETE /api/registrations/:id
// @access  Private
const dropCourse = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Verify the student owns this registration
    if (registration.student.toString() !== req.student._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to drop this registration" });
    }

    if (registration.status !== "active") {
      return res
        .status(400)
        .json({ message: "Registration is no longer active" });
    }

    // Mark registration as dropped
    registration.status = "dropped";
    await registration.save();

    // Decrement the course enrolled count
    await Course.findByIdAndUpdate(registration.course, {
      $inc: { enrolled: -1 },
    });

    res.json({ message: "Course dropped successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = { registerCourse, getMyRegistrations, dropCourse };
