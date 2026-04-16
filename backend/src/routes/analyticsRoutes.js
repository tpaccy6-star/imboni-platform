const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authorize } = require('../middleware/rbac');

router.get('/health', authorize(['SUPERADMIN', 'ADMIN']), analyticsController.getHealthStatus);
router.get('/traffic', authorize(['SUPERADMIN', 'ADMIN']), analyticsController.getTrafficStats);

module.exports = router;
