const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');

// Admin Middleware Verification
const adminOnly = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin rights required.' });
  }
  next();
};

// Admin Stats Overview
router.get('/stats', [auth, adminOnly], async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubs = await User.countDocuments({ subscription: { $ne: 'none' } });
    const creditsAgg = await User.aggregate([{ $group: { _id: null, total: { $sum: '$credits' } } }]);
    const totalCredits = creditsAgg[0]?.total || 0;
    const totalLookups = await History.countDocuments();

    const recentSignups = await User.find().select('-password').sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      activeSubs,
      totalCredits,
      totalLookups,
      recentSignups
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// Manage Users (Search / Edit / Delete / Credits)
router.get('/users', [auth, adminOnly], async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put('/user/:id', [auth, adminOnly], async (req, res) => {
  const { credits, subscription, role } = req.body;
  try {
    const updateData = {};
    if (credits !== undefined) updateData.credits = credits;
    if (role) updateData.role = role;
    if (subscription) {
      updateData.subscription = subscription;
      if (subscription === 'weekly') {
        updateData.subscriptionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      } else if (subscription === 'monthly') {
        updateData.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else if (subscription === 'lifetime') {
        updateData.subscriptionExpiry = null;
      } else if (subscription === 'none') {
        updateData.subscriptionExpiry = null;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/user/:id', [auth, adminOnly], async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
