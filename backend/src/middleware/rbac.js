const jwt = require('jsonwebtoken');
const prisma = require('../services/db');

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // Authenticate token (already done by authenticateToken but we can merge or keep separate)
    async (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id || decoded.userId } });

        if (!user) return res.status(401).json({ error: 'Invalid user.' });

        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ error: 'Forbidden: You do not have permission for this action.' });
        }

        req.user = user;
        next();
      } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
      }
    }
  ];
};

module.exports = { authorize };
