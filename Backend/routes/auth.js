const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin'); // TODO: Install firebase-admin package
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');

const { authRequired } = require('../middlewares/auth');
const { recreateAdmin } = require('../utils/seedAdmin');

const router = express.Router();

function generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Local Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already used" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.json({ token: generateToken(user), user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Local Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('🔍 Login attempt:', { email, passwordLength: password?.length });
    
    try {
        const user = await User.findOne({ email });
        console.log('🔍 User lookup result:', { 
            found: !!user, 
            email: user?.email,
            role: user?.role,
            hasPassword: !!user?.password,
            passwordLength: user?.password?.length,
            provider: user?.provider
        });
        
        if (!user) {
            console.log('❌ User not found');
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log('🔍 Comparing passwords...');
        const match = await bcrypt.compare(password, user.password);
        console.log('🔍 Password match result:', match);
        
        if (!match) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ message: "Invalid credentials" });
        }

        await LoginLog.create({ user: user._id, ip: req.ip, userAgent: req.headers['user-agent'] });
        console.log('✅ Login successful for:', email);

        res.json({ token: generateToken(user), user });
    } catch (err) {
        console.error('💥 Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Google Login (verify Firebase token)
router.post('/google', async (req, res) => {
    const { idToken } = req.body;
    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const { email, name } = decoded;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, provider: 'google' });
        }

        await LoginLog.create({ user: user._id, ip: req.ip, userAgent: req.headers['user-agent'] });

        res.json({ token: generateToken(user), user });
    } catch (err) {
        res.status(401).json({ message: "Invalid Google token", error: err.message });
    }
});

// Get current user
router.get('/me', authRequired, (req, res) => {
    res.json(req.user);
});

// Debug route - check admin user (REMOVE IN PRODUCTION)
router.get('/debug-admin', async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const user = await User.findOne({ email: adminEmail });
        
        if (!user) {
            return res.json({ 
                message: 'Admin user not found',
                searchedEmail: adminEmail 
            });
        }
        
        res.json({
            message: 'Admin user found',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                provider: user.provider,
                hasPassword: !!user.password,
                passwordLength: user.password?.length,
                passwordFirstChars: user.password?.substring(0, 10) + '...'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Debug route - recreate admin user (REMOVE IN PRODUCTION)
router.post('/recreate-admin', async (req, res) => {
    try {
        const newAdmin = await recreateAdmin();
        res.json({ 
            message: 'Admin user recreated successfully',
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
                name: newAdmin.name,
                role: newAdmin.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
