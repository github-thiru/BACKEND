const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: String,                 // e.g. "Create Task", "Delete User"
  performedBy: String,           // user ID or email
  role: String,                  // e.g. "admin" or "user"
  timestamp: {
    type: Date,
    default: Date.now,
  },
  meta: mongoose.Schema.Types.Mixed, // Extra info (taskId, userId, etc.)
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
