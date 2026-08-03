const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const History = require('../models/History');
const auth = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured in server env' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'superadmin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    return next();
  }
  
  if (req.user && req.user.id) {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') return next();
  }
  
  return res.status(403).json({ error: 'Access denied. Master admin only.' });
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

  // Safety cast to Number to handle custom inputs properly
  if (credits !== undefined) {
    user.credits += Number(credits);
  }
  
  if (subscription !== undefined) {
    user.subscription = subscription;
    if (subscription === 'weekly') user.subscriptionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    if (subscription === 'monthly') user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (subscription === 'lifetime') user.subscriptionExpiry = null;
    if (subscription === 'none') user.subscriptionExpiry = null;
  }

  if (user.credits < 0) user.credits = 0;

  await user.save();
  res.json({ success: true, user });
});

router.post('/users/:id/reset-credits', auth, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.credits = 0;
  await user.save();
  res.json({ success: true });
});

router.delete('/users/:id', auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
