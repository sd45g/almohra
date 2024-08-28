const User = require('../models/user')
const jwtHelpers = require('../utils/jwtHelpers')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
//===================
      
      
//==================================
exports.register = async (req, res) => {
    // التحقق من الأخطاء في التحقق من صحة البيانات
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    try {
        // استخراج البيانات من الطلب
        const { name, email, password, role } = req.body;
        // إنشاء مستخدم جديد
        const newUser = new User({
            name,
            email,
            password,
            role,
        });
        // حفظ المستخدم في قاعدة البيانات
        await newUser.save();

          // إنشاء الـ JWT
          const token = jwtHelpers.sign({ id: newUser._id, email: newUser.email, role: newUser.role });


          
         
          // تخزين الـ JWT في كوكيز
          res.cookie('accessToken', token, {httpOnly: true})

      
         // إرجاع المستخدم بدون كلمة المرور
         res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


 //=====================
      

 //========================      


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // البحث عن المستخدم في قاعدة البيانات
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // التحقق من كلمة المرور
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // إنشاء رمز مميز
        const token = jwtHelpers.sign({ id: user._id, email: user.email, role: user.role });
        
        res.cookie('accessToken', token, {httpOnly: true})

        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





exports.logout = async (req, res) => {
    res.cookie('accessToken', '', {
        httpOnly: true,
        expires: new Date(0), // مسح الكوكيز
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};
//===================================
// استرداد ملف المستخدم الشخصي
exports.profile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // استبعاد كلمة المرور من النتائج

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error. Could not retrieve profile information.' });
    }
};





   