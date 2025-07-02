const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasks"); // ✅ This is correct

const adminRoutes = require("./routes/adminRoutes"); // or your actual path


// require("dotenv").config();
dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // ✅ allow frontend origin
    credentials: true, // ✅ if you send cookies/token
  }));
app.use(express.json());

app.use("/api/admin", adminRoutes); // ✅ THIS IS MANDATORY
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
