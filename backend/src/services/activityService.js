const prisma = require('./db');

const logActivity = async (userId, action, target = null, details = null, ipAddress = null) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        target,
        details: details ? JSON.stringify(details) : null,
        ipAddress
      }
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

module.exports = { logActivity };
