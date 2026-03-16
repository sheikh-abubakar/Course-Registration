// ============================================================
// MVC - MODEL: Course
// Represents an available course offered by the university
// ============================================================
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
    },
    credits: {
      type: Number,
      required: [true, "Credits are required"],
      min: 1,
      max: 6,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
    },
    enrolled: {
      type: Number,
      default: 0,
    },
    schedule: {
      type: String,
      required: [true, "Schedule is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
