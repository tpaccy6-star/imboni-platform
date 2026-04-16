const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authorize } = require('../middleware/rbac');

// Secure route for admin panel users only
router.post('/chat', authorize(['SUPERADMIN', 'ADMIN']), aiController.chatWithAssistant);

module.exports = router;
