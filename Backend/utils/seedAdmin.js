const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin';
    
    console.log('🔍 Seeding admin with:', { email, name, passwordLength: password?.length });
    
    if (!email || !password) {
        console.warn('⚠️ ADMIN_EMAIL/PASSWORD not set; skipping admin seed.');
        return;
    }
    const existing = await User.findOne({ email });
    if (existing) {
        console.log('🔍 Existing user found:', { 
            email: existing.email, 
            role: existing.role, 
            hasPassword: !!existing.password,
            passwordLength: existing.password?.length 
        });
        if (existing.role !== 'admin') {
            existing.role = 'admin';
            await existing.save();
            console.log('✅ Updated existing user role to admin');
        }
        console.log('ℹ️ Admin user already exists:', email);
        return;
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, name, password: passwordHash, role: 'admin', provider: 'local' });
    console.log('✅ Admin user created:', { email, id: newUser._id, role: newUser.role });
};

// Function to force recreate admin user
async function recreateAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin';
    
    console.log('🔄 Force recreating admin user...');
    
    if (!email || !password) {
        console.warn('⚠️ ADMIN_EMAIL/PASSWORD not set; cannot recreate admin.');
        return;
    }
    
    // Delete existing admin user
    const deleted = await User.deleteOne({ email });
    console.log('🗑️ Deleted existing admin user:', deleted.deletedCount > 0);
    
    // Create new admin user
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ 
        email, 
        name, 
        password: passwordHash, 
        role: 'admin', 
        provider: 'local' 
    });
    
    console.log('✅ Admin user recreated:', { 
        email, 
        id: newUser._id, 
        role: newUser.role,
        hasPassword: !!newUser.password,
        passwordLength: newUser.password?.length
    });
    
    return newUser;
};

module.exports = { seedAdmin, recreateAdmin };
