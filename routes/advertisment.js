// routes/advertisement.js
const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisment');

const { authMiddleware, authorizeRoles } = require('../middleware/auth');

// Apply authentication middleware
router.use(authMiddleware);

// Routes
router.post('/', authorizeRoles('admin'), advertisementController.createAdvertisement);
router.get('/', authorizeRoles('admin', 'customer'), advertisementController.getAllAdvertisements);
router.get('/:id', authorizeRoles('admin', 'customer'), advertisementController.getAdvertisementById);
router.put('/:id', authorizeRoles('admin'), advertisementController.updateAdvertisement);
router.delete('/:id', authorizeRoles('admin'), advertisementController.deleteAdvertisement);

module.exports = router;
