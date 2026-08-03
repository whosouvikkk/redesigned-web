const mongoose = require('mongoose');

const protectRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  telegram: { type: String, required: true },
  dataToProtect: { type: String, required: true },
  details: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProtectRequest', protectRequestSchema);
