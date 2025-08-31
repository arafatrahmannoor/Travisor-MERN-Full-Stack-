const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: String,
    ip: String,
    userAgent: String,
    success: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('LoginLog', loginLogSchema);
