const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
const { authorize } = require('../middleware/rbac');
const upload = require('../middleware/upload');

// Public route to fetch all opportunities
router.get('/', opportunityController.getAllOpportunities);
router.post('/:id/view', opportunityController.incrementOpportunityView);

// Admin-only routes for management
router.post('/', authorize(['SUPERADMIN', 'ADMIN']), upload.single('image'), opportunityController.createOpportunity);
router.patch('/:id', authorize(['SUPERADMIN', 'ADMIN']), upload.single('image'), opportunityController.updateOpportunity);
router.delete('/:id', authorize(['SUPERADMIN', 'ADMIN']), opportunityController.deleteOpportunity);

module.exports = router;
