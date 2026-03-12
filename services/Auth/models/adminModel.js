const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true }
}, { timestamps: true });

adminSchema.index({ email: 1 })

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;