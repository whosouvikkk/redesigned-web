const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  query: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
