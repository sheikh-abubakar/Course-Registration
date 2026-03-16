// ============================================================
// MVC - VIEW: Course Registration Component
// Core Use Case — Register a Course
// Inputs: Semester (dropdown), Course selection (cards)
// Communicates with: courseController + registrationController
// ============================================================
import React, { useState, useEffect } from "react";
import { getCourses, registerForCourse } from "../services/api";

function CourseRegistration({ student }) {
  const [courses, setCourses] = useState([]);
  const [semester, setSemester] = useState("Spring 2026");
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null); // courseId being registered
  const [message, setMessage] = useState({ text: "", type: "" });
  const [error, setError] = useState("");

  const semesterOptions = ["Spring 2026", "Fall 2026", "Summer 2026"];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await getCourses();
      setCourses(data);
    } catch (err) {
      setError("Failed to load courses. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (courseId) => {
    setMessage({ text: "", type: "" });
    setRegistering(courseId);
    try {
      const { data } = await registerForCourse(courseId, semester);
      setMessage({ text: data.message, type: "success" });
      fetchCourses(); // Refresh to update enrollment count
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Registration failed. Try again.",
        type: "error",
      });
    } finally {
      setRegistering(null);
    }
  };

  const getSeatsLabel = (course) => {
    const avail = course.capacity - course.enrolled;
    if (avail <= 0) return { text: "Full", cls: "badge-full" };
    if (avail <= 5)
      return { text: `${avail} seats left`, cls: "badge-limited" };
    return { text: `${avail} seats available`, cls: "badge-available" };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Register a Course</h2>
        <p>
          Welcome, <strong>{student.name}</strong> &nbsp;|&nbsp; Dept:{" "}
          {student.department} &nbsp;|&nbsp; Semester: {student.semester}
        </p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Semester Selector — Input field 1 */}
      <div className="semester-selector">
        <label htmlFor="semester">
          <strong>Select Semester:</strong>
        </label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="semester-select"
        >
          {semesterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading available courses...</div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => {
            const seats = getSeatsLabel(course);
            const isFull = course.enrolled >= course.capacity;
            const isRegistering = registering === course._id;

            return (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <span className="course-code">{course.courseCode}</span>
                  <span className={`availability-badge ${seats.cls}`}>
                    {seats.text}
                  </span>
                </div>

                <h3 className="course-name">{course.courseName}</h3>

                <div className="course-details">
                  <p>
                    <span className="label">Instructor:</span>{" "}
                    {course.instructor}
                  </p>
                  <p>
                    <span className="label">Department:</span>{" "}
                    {course.department}
                  </p>
                  <p>
                    <span className="label">Credits:</span> {course.credits}
                  </p>
                  <p>
                    <span className="label">Schedule:</span> {course.schedule}
                  </p>
                  <p>
                    <span className="label">Enrollment:</span> {course.enrolled}{" "}
                    / {course.capacity}
                  </p>
                </div>

                {/* Register Button — triggers course registration */}
                <button
                  className={`btn btn-full ${isFull ? "btn-disabled" : "btn-primary"}`}
                  onClick={() => handleRegister(course._id)}
                  disabled={isFull || isRegistering}
                >
                  {isRegistering
                    ? "Registering..."
                    : isFull
                      ? "Course Full"
                      : "Register"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="empty-state">
          <p>No courses available at this time.</p>
        </div>
      )}
    </div>
  );
}

export default CourseRegistration;
