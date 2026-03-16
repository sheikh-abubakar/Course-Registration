// ============================================================
// MVC - VIEW: Registered Courses Component
// Displays all courses currently registered by the student
// Allows dropping a course
// Communicates with: registrationController
// ============================================================
import React, { useState, useEffect } from "react";
import { getMyRegistrations, dropCourse } from "../services/api";

function RegisteredCourses({ student }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropping, setDropping] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data } = await getMyRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError("Failed to load your registered courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (registrationId, courseName) => {
    if (!window.confirm(`Are you sure you want to drop "${courseName}"?`))
      return;

    setDropping(registrationId);
    try {
      await dropCourse(registrationId);
      setMessage({
        text: `Successfully dropped ${courseName}`,
        type: "success",
      });
      setRegistrations((prev) => prev.filter((r) => r._id !== registrationId));
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message || "Failed to drop course. Try again.",
        type: "error",
      });
    } finally {
      setDropping(null);
    }
  };

  const totalCredits = registrations.reduce(
    (sum, r) => sum + (r.course?.credits || 0),
    0,
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Registered Courses</h2>
        <p>
          Student: <strong>{student.name}</strong> &nbsp;|&nbsp; ID:{" "}
          {student.studentId} &nbsp;|&nbsp; Department: {student.department}
        </p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading your courses...</div>
      ) : registrations.length === 0 ? (
        <div className="empty-state">
          <p>You have not registered for any courses yet.</p>
          <a href="/register" className="btn btn-primary">
            Browse Available Courses
          </a>
        </div>
      ) : (
        <>
          <div className="summary-bar">
            <span>
              Total Courses: <strong>{registrations.length}</strong>
            </span>
            <span>
              Total Credits: <strong>{totalCredits}</strong>
            </span>
          </div>

          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Instructor</th>
                  <th>Credits</th>
                  <th>Schedule</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, index) => (
                  <tr key={reg._id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{reg.course?.courseCode}</strong>
                    </td>
                    <td>{reg.course?.courseName}</td>
                    <td>{reg.course?.instructor}</td>
                    <td>{reg.course?.credits}</td>
                    <td>{reg.course?.schedule}</td>
                    <td>{reg.semester}</td>
                    <td>
                      <span className="status-badge status-active">
                        {reg.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDrop(reg._id, reg.course?.courseName)
                        }
                        disabled={dropping === reg._id}
                      >
                        {dropping === reg._id ? "Dropping..." : "Drop"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default RegisteredCourses;
