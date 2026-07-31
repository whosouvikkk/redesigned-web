const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');

const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Access denied. Admins only.' });
  next();
};

router.get('/stats', auth, adminOnly, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeSubs = await User.countDocuments({ 
    $or: [{ subscription: 'lifetime' }, { subscriptionExpiry: { $gt: new Date() } }] 
  });
  const totalLookups = await History.countDocuments();
  const recentSignups = await User.find().sort({ createdAt: -1 }).limit(5);

  res.json({ totalUsers, activeSubs, totalLookups, recentSignups });
});

router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

router.post('/users/:id/modify', auth, adminOnly, async (req, res) => {
  const { credits, subscription } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (credits !== undefined) user.credits = credits;
  if (subscription !== undefined) {
    user.subscription = subscription;
    if (subscription === 'weekly') user.subscriptionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    if (subscription === 'monthly') user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (subscription === 'lifetime') user.subscriptionExpiry = null;
    if (subscription === 'none') user.subscriptionExpiry = null;
  }

  await user.save();
  res.json({ success: true, user });
});

router.delete('/users/:id', auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
