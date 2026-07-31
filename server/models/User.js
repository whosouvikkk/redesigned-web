const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 0 },
  subscription: { 
    type: String, 
    enum: ['none', 'weekly', 'monthly', 'lifetime'], 
    default: 'none' 
  },
  subscriptionExpiry: { type: Date, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
