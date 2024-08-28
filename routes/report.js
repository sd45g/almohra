const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

// Apply authentication middleware
router.use(authMiddleware);

// Routes
router.post('/', authorizeRoles('admin'), reportController.createReport); // لإنشاء تقرير جديد
router.get('/', authorizeRoles('admin', 'customer'), reportController.getAllReports); // للحصول على جميع التقارير
router.get('/:id', authorizeRoles('admin', 'customer'), reportController.getReportById); // للحصول على تقرير معين باستخدام ID
router.put('/:id', authorizeRoles('admin'), reportController.updateReport); // لتحديث تقرير معين باستخدام ID
router.delete('/:id', authorizeRoles('admin'), reportController.deleteReport); // لحذف تقرير معين باستخدام ID

module.exports = router;
