// ============================================================
// DB LAYER — MongoDB connection using Mongoose
// ============================================================
const dns = require("dns");
const mongoose = require("mongoose");

// Optional for SRV URLs; harmless for standard mongodb:// URLs too
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;