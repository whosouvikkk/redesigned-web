const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');
const cleanOSINTResponse = require('../utils/cleaner');

router.post('/search', auth, async (req, res) => {
  const { type, query } = req.body;
  
  if (!type || !query) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check Active Subscription status
    const isSubActive = user.subscription !== 'none' && 
      (user.subscription === 'lifetime' || (user.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date()));

    // Check Credits if no active subscription
    if (!isSubActive && user.credits <= 0) {
      return res.status(403).json({ error: 'Insufficient credits' });
    }

    // Map Lookup Type to Endpoint
    const urls = {
      number: process.env.OSINT_NUMBER_URL,
      vehicle: process.env.OSINT_VEHICLE_URL,
      aadhar: process.env.OSINT_AADHAR_URL,
      upi: process.env.OSINT_UPI_URL,
      domain: process.env.OSINT_DOMAIN_URL,
    };

    const targetUrl = urls[type];
    if (!targetUrl) return res.status(400).json({ error: 'Invalid lookup type' });

    // Execute External Lookup
    const response = await axios.get(`${targetUrl}${encodeURIComponent(query)}`);
    const cleanedData = cleanOSINTResponse(response.data);

    // Deduct credit if subscription is not active
    if (!isSubActive) {
      user.credits -= 1;
      await user.save();
    }

    // Record History
    await History.create({
      userId: user._id,
      type,
      query,
      status: 'success'
    });

    return res.json({
      data: cleanedData,
      remainingCredits: user.credits,
      isSubActive
    });

  } catch (error) {
    if (req.user?.id) {
      await History.create({ userId: req.user.id, type, query, status: 'failed' });
    }
    return res.status(500).json({ error: error.response?.data?.error || 'Lookup service unreachable.' });
  }
});

// User History Endpoint
router.get('/history', auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
