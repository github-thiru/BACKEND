const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");
const logAction = require("../utils/logAction");

// 🧑 Get all users  
router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 🔒 Deactivate user
router.put("/users/:id/deactivate", auth, isAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: false });

  await logAction({
    action: "Deactivate User",
    performedBy: req.user.email,
    role: req.user.role,
    meta: { targetUserId: req.params.id }
  });

  res.json({ message: "User deactivated" });
});


// 🔓 Reactivate user
router.put("/users/:id/activate", auth, isAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: true });

  await logAction({
    action: "Reactivate User",
    performedBy: req.user.email,
    role: req.user.role,
    meta: { targetUserId: req.params.id }
  });

  res.json({ message: "User activated" });
});


router.get("/all-tasks", auth,isAdmin, async (req, res) => {
  try {
    console.log("🔍 Fetching all tasks...");
    const tasks = await Task.find().populate("userId", "email username");
    console.log("✅ Tasks fetched:", tasks.length);
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching all tasks:", err.message);
    console.error(err); // Print full error stack
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});




// ✅ Get all tasks of a specific user (admin only)
router.get("/users/:userId/tasks", auth, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching user's tasks:", err.message);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});



module.exports = router;
