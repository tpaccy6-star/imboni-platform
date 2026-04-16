const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { authorize } = require('../middleware/rbac');

// Publicly readable settings (e.g., for WhatsApp button)
router.get('/', settingsController.getSettings);

// Admin-only updates
router.patch('/', authorize(['SUPERADMIN', 'ADMIN']), settingsController.updateSettings);

module.exports = router;
