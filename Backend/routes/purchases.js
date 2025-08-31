const express = require('express');
const { authRequired } = require('../middlewares/auth');
const Request = require('../models/Request');

const router = express.Router();

// Get approved requests ready for payment
router.get('/pending', authRequired, async (req, res) => {
    try {
        const requests = await Request.find({ 
            user: req.user.id, 
            status: 'payment_pending' 
        }).sort({ createdAt: -1 });

        res.json({ 
            success: true, 
            requests 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching pending payments", 
            error: error.message 
        });
    }
});

// Initiate payment process
router.post('/initiate', authRequired, async (req, res) => {
    try {
        const { requestId, paymentMethod = 'card' } = req.body;

        const request = await Request.findOne({ 
            _id: requestId, 
            user: req.user.id, 
            status: 'payment_pending' 
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "No approved request found for payment" 
            });
        }

        // Here you would integrate with your payment gateway (Stripe, PayPal, etc.)
        // For now, we'll simulate the payment initiation
        
        const paymentSession = {
            sessionId: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            amount: request.totalAmount,
            currency: 'USD',
            requestId: request._id,
            status: 'pending'
        };

        // In a real implementation, you would:
        // 1. Create payment session with your payment provider
        // 2. Return the payment URL or session details
        // 3. Handle payment webhooks to confirm payment

        res.json({ 
            success: true, 
            message: "Payment session created", 
            paymentSession,
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error initiating payment", 
            error: error.message 
        });
    }
});

// Confirm payment (would typically be called by payment webhook)
router.post('/confirm', authRequired, async (req, res) => {
    try {
        const { 
            requestId, 
            paymentId, 
            amount, 
            paymentMethod = 'card',
            sessionId 
        } = req.body;

        const request = await Request.findOne({ 
            _id: requestId, 
            user: req.user.id, 
            status: 'payment_pending' 
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found or not ready for payment" 
            });
        }

        // Verify payment amount matches request amount
        if (amount !== request.totalAmount) {
            return res.status(400).json({ 
                success: false, 
                message: "Payment amount mismatch" 
            });
        }

        // Update request with payment information
        request.status = 'paid';
        request.payment = {
            amount,
            currency: 'USD',
            paymentId,
            paymentMethod,
            paidAt: new Date()
        };

        // Add success notification
        request.notifications.push({
            message: `Payment successful! Your booking for "${request.packageTitle}" is confirmed.`,
            read: false
        });

        await request.save();

        res.json({ 
            success: true, 
            message: "Payment confirmed successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error confirming payment", 
            error: error.message 
        });
    }
});

// Get user's purchase history
router.get('/history', authRequired, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        
        let filter = { 
            user: req.user.id, 
            status: { $in: ['paid', 'completed'] } 
        };
        
        if (status) {
            filter.status = status;
        }

        const purchases = await Request.find(filter)
            .sort({ 'payment.paidAt': -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Request.countDocuments(filter);

        res.json({ 
            success: true, 
            purchases,
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
            message: "Error fetching purchase history", 
            error: error.message 
        });
    }
});

// Get single purchase details
router.get('/:id', authRequired, async (req, res) => {
    try {
        const purchase = await Request.findOne({ 
            _id: req.params.id, 
            user: req.user.id,
            status: { $in: ['paid', 'completed'] }
        });

        if (!purchase) {
            return res.status(404).json({ 
                success: false, 
                message: "Purchase not found" 
            });
        }

        res.json({ 
            success: true, 
            purchase 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching purchase", 
            error: error.message 
        });
    }
});

// Cancel payment (before confirmation)
router.post('/cancel', authRequired, async (req, res) => {
    try {
        const { requestId, reason } = req.body;

        const request = await Request.findOne({ 
            _id: requestId, 
            user: req.user.id, 
            status: 'payment_pending' 
        });

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found or payment not pending" 
            });
        }

        // Add cancellation notification
        request.notifications.push({
            message: `Payment cancelled for "${request.packageTitle}". ${reason || ''}`,
            read: false
        });

        await request.save();

        res.json({ 
            success: true, 
            message: "Payment cancelled", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error cancelling payment", 
            error: error.message 
        });
    }
});

module.exports = router;
