import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ student, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎓</span>
        <h2>Course Registration System</h2>
      </div>

      <div className="navbar-links">
        <Link
          to="/register"
          className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
        >
          Register Courses
        </Link>
        <Link
          to="/my-courses"
          className={`nav-link ${location.pathname === "/my-courses" ? "active" : ""}`}
        >
          My Courses
        </Link>
      </div>

      <div className="navbar-user">
        <span className="user-info">
          {student.name} <span className="user-id">({student.studentId})</span>
        </span>
        <button className="btn btn-outline btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
