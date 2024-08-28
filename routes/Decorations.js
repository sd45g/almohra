const express = require('express');
const router = express.Router();
const decorationController = require('../controllers/Decorations');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

// تطبيق Middleware للتحقق من JWT
router.use(authMiddleware);

// Routes
router.post('/', authorizeRoles('admin'), decorationController.createDecoration);
router.get('/', authorizeRoles('admin', 'customer'), decorationController.getAllDecorations);
router.get('/:id', authorizeRoles('admin', 'customer'), decorationController.getDecorationById);
router.put('/:id', authorizeRoles('admin'), decorationController.updateDecoration);
router.delete('/:id', authorizeRoles('admin'), decorationController.deleteDecoration);

module.exports = router;
