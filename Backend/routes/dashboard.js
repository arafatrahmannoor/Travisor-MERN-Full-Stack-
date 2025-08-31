const express = require('express');
const { authRequired } = require('../middlewares/auth');
const Request = require('../models/Request');
const User = require('../models/User');

const router = express.Router();

// Get user dashboard overview
router.get('/overview', authRequired, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get request statistics
        const requestStats = await Request.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const stats = {
            pending: 0,
            approved: 0,
            rejected: 0,
            payment_pending: 0,
            paid: 0,
            completed: 0,
            cancelled: 0
        };

        requestStats.forEach(item => {
            stats[item._id] = item.count;
        });

        // Get recent activities
        const recentRequests = await Request.find({ user: userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select('packageTitle status createdAt updatedAt totalAmount');

        // Get upcoming bookings (paid status)
        const upcomingBookings = await Request.find({ 
            user: userId,
            status: { $in: ['paid', 'completed'] },
            checkInDate: { $gte: new Date() }
        })
        .sort({ checkInDate: 1 })
        .limit(3);

        // Get unread notifications count
        const unreadCount = await Request.aggregate([
            { $match: { user: userId } },
            { $unwind: '$notifications' },
            { $match: { 'notifications.read': false } },
            { $count: 'unreadCount' }
        ]);

        const dashboardData = {
            stats,
            recentRequests,
            upcomingBookings,
            unreadNotifications: unreadCount[0]?.unreadCount || 0
        };

        res.json({ 
            success: true, 
            dashboard: dashboardData 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching dashboard data", 
            error: error.message 
        });
    }
});

// Get user's active bookings (paid/completed)
router.get('/bookings', authRequired, async (req, res) => {
    try {
        const { page = 1, limit = 10, status = 'paid,completed' } = req.query;
        
        const statusArray = status.split(',');
        const filter = { 
            user: req.user.id,
            status: { $in: statusArray }
        };

        const bookings = await Request.find(filter)
            .sort({ checkInDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Request.countDocuments(filter);

        res.json({ 
            success: true, 
            bookings,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching bookings", 
            error: error.message 
        });
    }
});

// Get user's pending requests
router.get('/pending-requests', authRequired, async (req, res) => {
    try {
        const pendingRequests = await Request.find({ 
            user: req.user.id,
            status: { $in: ['pending', 'payment_pending'] }
        }).sort({ createdAt: -1 });

        res.json({ 
            success: true, 
            requests: pendingRequests 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching pending requests", 
            error: error.message 
        });
    }
});

// Get user profile with request summary
router.get('/profile', authRequired, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        // Get user's booking statistics
        const totalBookings = await Request.countDocuments({ user: req.user.id });
        const completedBookings = await Request.countDocuments({ 
            user: req.user.id, 
            status: 'completed' 
        });
        
        // Calculate total spent
        const spentData = await Request.aggregate([
            { $match: { user: req.user.id, status: { $in: ['paid', 'completed'] } } },
            { $group: { _id: null, totalSpent: { $sum: '$payment.amount' } } }
        ]);

        const profileData = {
            user,
            bookingStats: {
                total: totalBookings,
                completed: completedBookings,
                totalSpent: spentData[0]?.totalSpent || 0
            }
        };

        res.json({ 
            success: true, 
            profile: profileData 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching profile", 
            error: error.message 
        });
    }
});

module.exports = router;
