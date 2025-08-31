const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    packageId: String,
    packageTitle: { type: String, required: true },
    packagePrice: { type: Number, required: true },
    guests: { type: Number, default: 1 },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    note: String,
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'payment_pending', 'paid', 'completed', 'cancelled'], 
        default: 'pending' 
    },
    adminResponse: {
        message: String,
        respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        respondedAt: Date
    },
    payment: {
        amount: Number,
        currency: { type: String, default: 'USD' },
        paymentId: String,
        paymentMethod: String,
        paidAt: Date
    },
    totalAmount: { type: Number }, // guests * packagePrice + any fees
    notifications: [{
        message: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Calculate total amount before saving
requestSchema.pre('save', function(next) {
    if (this.packagePrice && this.guests) {
        this.totalAmount = this.packagePrice * this.guests;
    }
    next();
});

module.exports = mongoose.model('Request', requestSchema);
