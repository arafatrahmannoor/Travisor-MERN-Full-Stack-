const jwt = require('jsonwebtoken');
const User = require('../models/User');



async function authRequired(req, res, next) {
    try {
        const h = req.headers.authorization || '';
        const token = h.startsWith('Bearer ') ? h.slice(7) : null;
        if (!token) return res.status(401).json({ message: 'Missing token' });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).lean();
        if (!user) return res.status(401).json({ message: 'User not found' });
        req.user = { _id: user._id, id: user._id.toString(), role: user.role, email: user.email, name: user.name };
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

function adminOnly(req, res, next) {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
}

module.exports = { authRequired, adminOnly };
