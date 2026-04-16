const prisma = require('../services/db');
const { logActivity } = require('../services/activityService');

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { _count: { select: { auditLogs: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role }
    });

    await logActivity(
      req.user.id,
      'UPDATE_USER_ROLE',
      `User:${userId}`,
      { newRole: role }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    
    await logActivity(
      req.user.id,
      'DELETE_USER',
      `User:${id}`,
      { deletedAt: new Date() }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const getUserLogs = async (req, res) => {
  const { id } = req.params;
  try {
    const logs = await prisma.auditLog.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user logs' });
  }
};

const getAllLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all logs' });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserLogs,
  getAllLogs
};
