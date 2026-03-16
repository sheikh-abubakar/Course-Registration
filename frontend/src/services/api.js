// ============================================================
// API Service Layer
// Centralizes all HTTP calls to the backend
// Uses axios with automatic JWT token attachment via interceptor
// ============================================================
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const student = JSON.parse(localStorage.getItem("student") || "null");
  if (student?.token) {
    config.headers.Authorization = `Bearer ${student.token}`;
  }
  return config;
});

// ── Auth ──────────────────────────────────────────────────────
export const loginStudent = (studentId, password) =>
  api.post("/auth/login", { studentId, password });

export const getStudentProfile = () => api.get("/auth/profile");

// ── Courses ───────────────────────────────────────────────────
export const getCourses = () => api.get("/courses");

// ── Registrations ─────────────────────────────────────────────
export const registerForCourse = (courseId, semester) =>
  api.post("/registrations", { courseId, semester });

export const getMyRegistrations = () => api.get("/registrations/my");

export const dropCourse = (registrationId) =>
  api.delete(`/registrations/${registrationId}`);

export default api;
