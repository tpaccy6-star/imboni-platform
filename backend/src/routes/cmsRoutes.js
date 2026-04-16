const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');
const { authorize } = require('../middleware/rbac');

router.get('/posts', cmsController.getPosts);
router.post('/posts', authorize(['SUPERADMIN', 'ADMIN', 'EDITOR']), cmsController.createPost);
router.patch('/posts/:id', authorize(['SUPERADMIN', 'ADMIN', 'EDITOR']), cmsController.updatePost);
router.delete('/posts/:id', authorize(['SUPERADMIN', 'ADMIN', 'EDITOR']), cmsController.deletePost);

router.get('/pages', cmsController.getPages);
router.post('/pages', authorize(['SUPERADMIN', 'ADMIN']), cmsController.createPage);
router.patch('/pages/:id', authorize(['SUPERADMIN', 'ADMIN']), cmsController.updatePage);
router.delete('/pages/:id', authorize(['SUPERADMIN', 'ADMIN']), cmsController.deletePage);

module.exports = router;
