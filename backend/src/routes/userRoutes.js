const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorize } = require('../middleware/rbac');

// Super Admin only routes
router.get('/', authorize(['SUPERADMIN']), userController.getAllUsers);
router.post('/role', authorize(['SUPERADMIN', 'ADMIN']), userController.updateUserRole);
router.delete('/:id', authorize(['SUPERADMIN']), userController.deleteUser);
router.get('/all/logs', authorize(['SUPERADMIN', 'ADMIN']), userController.getAllLogs);
router.get('/:id/logs', authorize(['SUPERADMIN', 'ADMIN']), userController.getUserLogs);

module.exports = router;
