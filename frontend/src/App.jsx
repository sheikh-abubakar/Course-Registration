import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import CourseRegistration from "./components/CourseRegistration";
import RegisteredCourses from "./components/RegisteredCourses";
import Navbar from "./components/Navbar";

function App() {
  // Restore student session from localStorage on page refresh
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("student");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (studentData) => {
    setStudent(studentData);
    localStorage.setItem("student", JSON.stringify(studentData));
  };

  const handleLogout = () => {
    setStudent(null);
    localStorage.removeItem("student");
  };

  return (
    <Router>
      {student && <Navbar student={student} onLogout={handleLogout} />}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              student ? (
                <Navigate to="/register" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              student ? (
                <CourseRegistration student={student} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/my-courses"
            element={
              student ? (
                <RegisteredCourses student={student} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
