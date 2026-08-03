const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  credits: { type: Number, default: 0 },
  subscription: { type: String, default: 'none' }, // 'none', 'weekly', 'monthly', 'lifetime'
  
  // THIS IS THE MISSING PIECE: The database needs to know this field is allowed to exist
  subscriptionExpiry: { type: Date, default: null },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
