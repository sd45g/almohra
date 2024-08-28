const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontoller');
const { authMiddleware } = require('../middleware/auth');
const { body } = require('express-validator');
// مسارات التسجيل وتسجيل الدخول
router.post('/login', authController.login)
router.post('/register', [
    // تحقق من أن الاسم ليس فارغًا
    body('name').notEmpty().withMessage('Name is required'),
    // تحقق من أن البريد الإلكتروني صحيح
    body('email').isEmail().withMessage('Please enter a valid email address'),
    // تحقق من أن كلمة المرور تحتوي على 6 حروف على الأقل
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], authController.register);
router.post('/logout', authController.logout)
// مسار الـ Profile، يتطلب مصادقة باستخدام authMiddleware
router.get('/profile', authMiddleware, authController.profile)




module.exports = router;








