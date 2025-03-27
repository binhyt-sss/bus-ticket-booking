const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken; // Lấy token từ cookies
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Gán user vào request để sử dụng trong các route tiếp theo
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = { authMiddleware };
