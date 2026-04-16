const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authorize } = require('../middleware/rbac');

router.get('/stats', authorize(['SUPERADMIN', 'ADMIN']), dashboardController.getDashboardStats);

module.exports = router;
