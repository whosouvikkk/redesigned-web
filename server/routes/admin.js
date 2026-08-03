const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check admin password from the request body
const verifyAdmin = (req, res, next) => {
  const { adminPassword } = req.body;
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid Admin Password' });
  }
  next();
};

// POST route to login and fetch users
router.post('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT route to update a user (Credits or Subscription)
router.put('/user/:id', verifyAdmin, async (req, res) => {
  try {
    const { credits, subscription } = req.body;
    const updateData = {};
    
    if (credits !== undefined) updateData.credits = credits;
    
    if (subscription !== undefined) {
      updateData.subscription = subscription;
      
      // Automatically calculate and set the expiration date based on the plan chosen
      if (subscription === 'weekly') {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        updateData.subscriptionExpiry = expiry;
      } 
      else if (subscription === 'monthly') {
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);
        updateData.subscriptionExpiry = expiry;
      } 
      else if (subscription === 'lifetime') {
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 100); // 100 years into the future
        updateData.subscriptionExpiry = expiry;
      } 
      else {
        // If 'none' is selected, clear the expiry
        updateData.subscriptionExpiry = null;
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE route to permanently remove a user
router.delete('/user/:id', verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
