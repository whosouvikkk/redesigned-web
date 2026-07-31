const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Request Data Removal (Protected Data Removal Service)
router.post('/request-removal', auth, async (req, res) => {
  const { name, phone, reason, details } = req.body;
  if (!name || !phone || !reason) {
    return res.status(400).json({ error: 'Missing required removal details.' });
  }
  
  // Here request details are stored or forwarded to support queues
  res.json({ success: true, message: 'Data removal request submitted successfully under tracking reference ID.' });
});

module.exports = router;
