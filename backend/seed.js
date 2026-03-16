// ============================================================
// DATABASE SEEDER
// Populates MongoDB with sample students and courses
// Run with: npm run seed
// ============================================================
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");
const Course = require("./models/Course");
const Registration = require("./models/Registration");

dotenv.config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Fix: use Google DNS to resolve MongoDB Atlas SRV records

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected for seeding...");
};

// Sample Students
const students = [
  {
    studentId: "STU001",
    name: "Alice Johnson",
    email: "alice@university.edu",
    password: "password123",
    department: "Computer Science",
    semester: 3,
  },
  {
    studentId: "STU002",
    name: "Bob Smith",
    email: "bob@university.edu",
    password: "password123",
    department: "Information Technology",
    semester: 5,
  },
  {
    studentId: "STU003",
    name: "Carol White",
    email: "carol@university.edu",
    password: "password123",
    department: "Computer Science",
    semester: 1,
  },
];

// Sample Courses
const courses = [
  {
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    instructor: "Dr. Alan Turing",
    credits: 3,
    capacity: 40,
    enrolled: 0,
    schedule: "Mon/Wed/Fri  09:00 - 10:00",
    department: "Computer Science",
  },
  {
    courseCode: "CS201",
    courseName: "Data Structures & Algorithms",
    instructor: "Dr. Grace Hopper",
    credits: 4,
    capacity: 35,
    enrolled: 0,
    schedule: "Tue/Thu  10:00 - 11:30",
    department: "Computer Science",
  },
  {
    courseCode: "CS301",
    courseName: "Database Systems",
    instructor: "Dr. Edgar Codd",
    credits: 3,
    capacity: 30,
    enrolled: 0,
    schedule: "Mon/Wed  14:00 - 15:30",
    department: "Computer Science",
  },
  {
    courseCode: "CS401",
    courseName: "Web Development",
    instructor: "Prof. Tim Berners-Lee",
    credits: 3,
    capacity: 25,
    enrolled: 0,
    schedule: "Fri  13:00 - 16:00",
    department: "Computer Science",
  },
  {
    courseCode: "IT201",
    courseName: "Network Administration",
    instructor: "Prof. Vint Cerf",
    credits: 3,
    capacity: 30,
    enrolled: 0,
    schedule: "Tue/Thu  13:00 - 14:30",
    department: "Information Technology",
  },
  {
    courseCode: "MATH201",
    courseName: "Discrete Mathematics",
    instructor: "Dr. George Boole",
    credits: 3,
    capacity: 45,
    enrolled: 0,
    schedule: "Mon/Wed/Fri  11:00 - 12:00",
    department: "Mathematics",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Registration.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});
    console.log("Cleared existing data...");

    // Insert courses
    await Course.insertMany(courses);
    console.log(`Inserted ${courses.length} courses`);

    // Insert students — password hashing happens via pre-save hook in Student model
    for (const studentData of students) {
      await Student.create(studentData);
    }
    console.log(`Inserted ${students.length} students`);

    console.log("\n====================================");
    console.log("  DATABASE SEEDED SUCCESSFULLY");
    console.log("====================================");
    console.log("  Login credentials:");
    students.forEach((s) => {
      console.log(`  ID: ${s.studentId}  |  Password: ${s.password}`);
    });
    console.log("====================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedData();