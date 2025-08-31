const express = require('express');
const { authRequired } = require('../middlewares/auth');
const Request = require('../models/Request');

const router = express.Router();

// User creates booking request
router.post('/', authRequired, async (req, res) => {
    try {
        const { 
            packageId, 
            packageTitle, 
            packagePrice, 
            guests, 
            checkInDate, 
            checkOutDate, 
            note 
        } = req.body;

        // Validate required fields
        if (!packageTitle || !packagePrice || !checkInDate || !checkOutDate) {
            return res.status(400).json({ 
                success: false, 
                message: "Package title, price, check-in and check-out dates are required" 
            });
        }

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const today = new Date();
        
        if (checkIn < today) {
            return res.status(400).json({ 
                success: false, 
                message: "Check-in date cannot be in the past" 
            });
        }
        
        if (checkOut <= checkIn) {
            return res.status(400).json({ 
                success: false, 
                message: "Check-out date must be after check-in date" 
            });
        }

        const request = await Request.create({ 
            user: req.user.id, 
            packageId, 
            packageTitle, 
            packagePrice,
            guests: guests || 1, 
            checkInDate: checkIn,
            checkOutDate: checkOut,
            note 
        });

        // Populate user info for response
        await request.populate('user', 'name email');

        res.status(201).json({ 
            success: true, 
            message: "Booking request submitted successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error creating booking request", 
            error: error.message 
        });
    }
});

// User sees own requests with status filtering
router.get('/mine', authRequired, async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const filter = { user: req.user.id };
        
        if (status) {
            filter.status = status;
        }

        const requests = await Request.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('adminResponse.respondedBy', 'name');

        const total = await Request.countDocuments(filter);

        res.json({ 
            success: true, 
            requests,
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
            message: "Error fetching requests", 
            error: error.message 
        });
    }
});

// Get single request details
router.get('/:id', authRequired, async (req, res) => {
    try {
        const request = await Request.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        }).populate('adminResponse.respondedBy', 'name email');

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        res.json({ 
            success: true, 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching request", 
            error: error.message 
        });
    }
});

// User cancels their own request (only if pending or approved)
router.patch('/:id/cancel', authRequired, async (req, res) => {
    try {
        const request = await Request.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        if (!['pending', 'approved', 'payment_pending'].includes(request.status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot cancel request in current status" 
            });
        }

        request.status = 'cancelled';
        request.notifications.push({
            message: "You cancelled this booking request",
            read: false
        });

        await request.save();

        res.json({ 
            success: true, 
            message: "Request cancelled successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error cancelling request", 
            error: error.message 
        });
    }
});

// Get user notifications
router.get('/notifications/unread', authRequired, async (req, res) => {
    try {
        const requests = await Request.find({ 
            user: req.user.id,
            'notifications.read': false 
        }).select('notifications packageTitle status');

        let unreadNotifications = [];
        requests.forEach(request => {
            const unread = request.notifications.filter(n => !n.read);
            unread.forEach(notification => {
                unreadNotifications.push({
                    requestId: request._id,
                    packageTitle: request.packageTitle,
                    status: request.status,
                    message: notification.message,
                    createdAt: notification.createdAt
                });
            });
        });

        res.json({ 
            success: true, 
            notifications: unreadNotifications.sort((a, b) => b.createdAt - a.createdAt) 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching notifications", 
            error: error.message 
        });
    }
});

// Mark notifications as read
router.patch('/:id/notifications/read', authRequired, async (req, res) => {
    try {
        const request = await Request.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        request.notifications.forEach(notification => {
            notification.read = true;
        });

        await request.save();

        res.json({ 
            success: true, 
            message: "Notifications marked as read" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating notifications", 
            error: error.message 
        });
    }
});

module.exports = router;
