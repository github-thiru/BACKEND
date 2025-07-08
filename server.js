const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env
dotenv.config();

// Route imports
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasks");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true
}));
app.use(express.json());


// root Api
// app.get("/", (req, res) => {
//   res.send("Welcome to the API! 🎉");
// });

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Debug: Show loaded Mongo URI (remove in production)
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});


