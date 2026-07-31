const mongoose = require('mongoose');

const protectRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, required: true },
  details: { type: String },
  status: { type: String, enum: ['Pending', 'Review', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('ProtectRequest', protectRequestSchema);
