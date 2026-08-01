const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');
const ProtectRequest = require('../models/ProtectRequest');
const { cleanPayload } = require('../utils/cleaner');

router.post('/search', auth, async (req, res) => {
  const { type, query } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  const isSubActive = user.subscription !== 'none' && 
                      (user.subscription === 'lifetime' || (user.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date()));
  
  if (!isSubActive && user.credits <= 0) {
    return res.status(403).json({ error: 'Insufficient credits' });
  }

  const urls = {
    number: process.env.OSINT_NUMBER_URL,
    vehicle: process.env.OSINT_VEHICLE_URL,
    vehicle2number: process.env.OSINT_VEHICLE2NUMBER_URL || process.env.OSINT_VEHICLE_URL,
    aadhar: process.env.OSINT_AADHAR_URL,
    bomber: process.env.OSINT_BOMBER_URL || process.env.OSINT_NUMBER_URL,
  };

  const endpoint = urls[type];
  if (!endpoint) return res.status(400).json({ error: 'Invalid lookup type' });

  try {
    const response = await axios.get(`${endpoint}${encodeURIComponent(query)}`);
    let data = response.data;

    // Standard backend payload sanitization
    data = cleanPayload(data, process.env.KEY_OWNER_REPLACEMENT || 'MoonWitch');

    // Target and remove the _proxy object specifically for vehicle lookups
    if (type === 'vehicle' && data._proxy) {
      delete data._proxy;
    }

    if (!isSubActive) {
      user.credits -= 1;
      await user.save();
    }

    await History.create({ userId: user._id, type, query, status: 'success' });
    return res.json(data);
  } catch (error) {
    await History.create({ userId: user._id, type, query, status: 'failed' });
    return res.status(404).json({ error: 'No data found in database' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/protect-request', async (req, res) => {
  try {
    const { name, phone, reason, details } = req.body;
    const request = await ProtectRequest.create({ name, phone, reason, details });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit protection request' });
  }
});

module.exports = router;
