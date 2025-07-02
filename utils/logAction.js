const AuditLog = require("../models/AuditLog");

const logAction = async ({ action, performedBy, role, meta = {} }) => {
  try {
    const log = new AuditLog({ action, performedBy, role, meta });
    await log.save();
  } catch (err) {
    console.error("❌ Failed to log audit action:", err.message);
  }
};

module.exports = logAction;
