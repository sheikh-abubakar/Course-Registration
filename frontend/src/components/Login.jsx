// ============================================================
// MVC - VIEW: Login Component
// Interface: Student ID + Password fields
// Communicates with: authController via /api/auth/login
// ============================================================
import React, { useState } from "react";
import { loginStudent } from "../services/api";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ studentId: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentId, password } = formData;

    if (!studentId.trim() || !password.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await loginStudent(studentId.trim(), password);
      onLogin(data); // Pass student data + token to App
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🎓</div>
          <h1>Course Registration System</h1>
          <p>Sign in with your Student ID and Password</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="e.g. STU001"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login-hint">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>STU001 / password123 &nbsp;|&nbsp; STU002 / password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
