// ============================================================
// MVC - MODEL: Registration
// Represents a student's enrollment in a course
// Links Student and Course — the core use case table
// ============================================================
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
    },
    status: {
      type: String,
      enum: ["active", "dropped", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Registration", registrationSchema);
