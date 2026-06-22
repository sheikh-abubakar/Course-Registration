const request = require("supertest");
const express = require("express");

// Simple isolated app for testing (avoids DB connection issues in CI)
const app = express();
app.get("/", (req, res) => {
  res.json({ message: "Course Registration API is running" });
});

describe("Health Check", () => {
  it("should return running message on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("WRONG MESSAGE");
  });
});