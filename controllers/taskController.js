const Task = require("../models/Task");
const logAction = require("../utils/logAction");

// ✅ Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};


// ✅ Create task
exports.createTask = async (req, res) => {
  console.log("✅ createTask reached");
  const { taskName, description, category, dueDate } = req.body;
  console.log("📥 Request Body:", req.body);
  console.log("👤 Authenticated User ID:", req.user?.id);

  try {
    const newTask = new Task({
      userId: req.user.id,
      taskName,
      description,
      category,
      dueDate,
    });

    const savedTask = await newTask.save();
    console.log("📝 Task saved successfully:", savedTask);

    // 🔍 Audit Log
    await logAction({
      action: "Create Task",
      performedBy: req.user.email,
      role: req.user.role,
      meta: { taskId: savedTask._id },
    });

    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Error while creating task:", err.message);
    res.status(500).json({ message: "Error creating task" });
  }
};

// ✅ Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // 🔍 Audit Log
    await logAction({
      action: "Update Task",
      performedBy: req.user.email,
      role: req.user.role,
      meta: { taskId: req.params.id, updatedFields: req.body },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// ✅ Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    // 🔍 Audit Log
    await logAction({
      action: "Delete Task",
      performedBy: req.user.email,
      role: req.user.role,
      meta: { taskId: req.params.id },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// ✅ Mark as complete
exports.markComplete = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "completed" },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // 🔍 Audit Log
    await logAction({
      action: "Mark Task Complete",
      performedBy: req.user.email,
      role: req.user.role,
      meta: { taskId: req.params.id },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error marking complete" });
  }
};
