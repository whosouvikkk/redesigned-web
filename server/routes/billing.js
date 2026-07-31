const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/purchase', auth, async (req, res) => {
  const { planType } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  if (planType === 'credits_25') user.credits += 25;
  if (planType === 'credits_100') user.credits += 100;
  if (planType === 'credits_250') user.credits += 250;
  
  if (planType === 'weekly') {
    user.subscription = 'weekly';
    user.subscriptionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  if (planType === 'monthly') {
    user.subscription = 'monthly';
    user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }
  if (planType === 'lifetime') {
    user.subscription = 'lifetime';
    user.subscriptionExpiry = null;
  }

  await user.save();
  res.json({ success: true, user: { credits: user.credits, subscription: user.subscription, subscriptionExpiry: user.subscriptionExpiry } });
});

module.exports = router;
