const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/authMiddleware");       // Auth middleware
// const adminCheck = require("../middlewares/adminMiddleware"); // Admin check middleware

// ✅ Import correct handler names from taskController
const {
  createTask,
  getTasks,         // ✅ matches: exports.getTasks
  updateTask,
  deleteTask,
  markComplete,     // ✅ matches: exports.markComplete
} = require("../controllers/taskController");

const auth = require("../middlewares/auth");
router.use(auth); // ✅ Protect all routes below


router.get("/", getTasks);           // GET /api/tasks
router.post("/", createTask);        // POST /api/tasks
router.put("/:id", updateTask);      // PUT /api/tasks/:id
router.delete("/:id", deleteTask);   // DELETE /api/tasks/:id
router.put("/complete/:id", markComplete); // PUT /api/tasks/complete/:id

module.exports = router;


// // ✅ Routes
// router.get("/tasks", auth, getTasks);
// router.post("/tasks", auth, createTask);
// router.put("/tasks/:id", auth, updateTask);
// router.delete("/tasks/:id", auth, deleteTask);
// router.put("/tasks/:id/complete", auth, markComplete);

// // Admin-only delete route
// router.delete("/admin/tasks/:id", auth, adminCheck, deleteTask);

// // ✅ Export router
// module.exports = router;
