const express = require('express');
const bcrypt = require('bcryptjs');
const { authRequired, adminOnly } = require('../middlewares/auth');
const Request = require('../models/Request');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');

const router = express.Router();

// List requests by status with enhanced filtering
router.get('/requests', authRequired, adminOnly, async (req, res) => {
    try {
        const { 
            status, 
            page = 1, 
            limit = 10, 
            sortBy = 'createdAt', 
            sortOrder = 'desc',
            search 
        } = req.query;
        
        let filter = {};
        if (status) filter.status = status;
        
        // Search by package title or user name/email
        if (search) {
            filter.$or = [
                { packageTitle: { $regex: search, $options: 'i' } },
                // We'll need to populate user to search by name/email
            ];
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const requests = await Request.find(filter)
            .populate('user', 'name email')
            .populate('adminResponse.respondedBy', 'name')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Request.countDocuments(filter);

        // Get status counts for dashboard
        const statusCounts = await Request.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const stats = {};
        statusCounts.forEach(item => {
            stats[item._id] = item.count;
        });

        res.json({ 
            success: true, 
            requests,
            stats,
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

// Get single request details for admin
router.get('/requests/:id', authRequired, adminOnly, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('adminResponse.respondedBy', 'name email');

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

// Admin approves/rejects request
router.patch('/requests/:id/respond', authRequired, adminOnly, async (req, res) => {
    try {
        const { status, message } = req.body;
        
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Status must be 'approved' or 'rejected'" 
            });
        }

        const request = await Request.findById(req.params.id).populate('user', 'name email');
        
        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: "Can only respond to pending requests" 
            });
        }

        // Update request status and admin response
        request.status = status === 'approved' ? 'payment_pending' : 'rejected';
        request.adminResponse = {
            message: message || `Request ${status}`,
            respondedBy: req.user.id,
            respondedAt: new Date()
        };

        // Add notification for user
        const notificationMessage = status === 'approved' 
            ? `Your booking request for "${request.packageTitle}" has been approved! You can now proceed to payment.`
            : `Your booking request for "${request.packageTitle}" has been rejected. ${message || ''}`;

        request.notifications.push({
            message: notificationMessage,
            read: false
        });

        await request.save();

        res.json({ 
            success: true, 
            message: `Request ${status} successfully`, 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error responding to request", 
            error: error.message 
        });
    }
});

// Admin updates request status (for other status changes)
router.patch('/requests/:id', authRequired, adminOnly, async (req, res) => {
    try {
        const { status, note } = req.body;
        
        const validStatuses = ['pending', 'approved', 'rejected', 'payment_pending', 'paid', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status" 
            });
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id, 
            { 
                status,
                ...(note && { 
                    $push: { 
                        notifications: { 
                            message: note, 
                            read: false 
                        } 
                    } 
                })
            }, 
            { new: true }
        ).populate('user', 'name email');

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Request updated successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating request", 
            error: error.message 
        });
    }
});

// Delete request
router.delete('/requests/:id', authRequired, adminOnly, async (req, res) => {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// See users
router.get('/users', authRequired, adminOnly, async (_req, res) => {
    try {
        const users = await User.find().select('-password'); // Don't send passwords
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
    }
});

// Add new user
router.post('/users', authRequired, adminOnly, async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    
    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email, and password are required" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User with this email already exists" 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role,
            provider: 'local'
        });
        
        await user.save();
        
        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json({ 
            success: true, 
            message: "User added successfully", 
            user: userResponse 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error adding user", 
            error: error.message 
        });
    }
});

// Update user
router.put('/users/:id', authRequired, adminOnly, async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        // Update fields if provided
        if (name) user.name = name;
        if (email) {
            // Check if email is already taken by another user
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Email already taken by another user" 
                });
            }
            user.email = email;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (role) user.role = role;
        
        await user.save();
        
        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json({ 
            success: true, 
            message: "User updated successfully", 
            user: userResponse 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating user", 
            error: error.message 
        });
    }
});

// Delete user
router.delete('/users/:id', authRequired, adminOnly, async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ 
                success: false, 
                message: "You cannot delete your own account" 
            });
        }

        await User.findByIdAndDelete(id);
        
        res.json({ 
            success: true, 
            message: "User deleted successfully" 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error deleting user", 
            error: error.message 
        });
    }
});

// Get single user by ID
router.get('/users/:id', authRequired, adminOnly, async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        res.json({ 
            success: true, 
            user 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching user", 
            error: error.message 
        });
    }
});

// See login history
router.get('/logins', authRequired, adminOnly, async (req, res) => {
    const { limit = 50, page = 1 } = req.query;
    const logs = await LoginLog.find()
        .populate('user')
        .sort({ timestamp: -1 })
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
    res.json(logs);
});

module.exports = router;
