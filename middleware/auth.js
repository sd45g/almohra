
const jwt = require('jsonwebtoken');

// Middleware للتحقق من JWT
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECURT);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware لتفويض الأدوار
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
        next();
    };
};

module.exports = {
    authMiddleware,
    authorizeRoles
};


    

