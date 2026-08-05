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

  // ✅ FAILSAFE LOGIC: Trust the plan string first to prevent false lockouts
  const hasPlan = user.subscription && user.subscription !== 'none';
  const isExpired = user.subscription !== 'lifetime' && 
                    user.subscriptionExpiry && 
                    new Date(user.subscriptionExpiry) < new Date();
                    
  const isSubActive = hasPlan && !isExpired;

  // GATEKEEPER: Block if no active plan AND 0 credits
  if (!isSubActive && user.credits <= 0) {
    return res.status(403).json({ error: 'Access Paywall Active. Please purchase credits or a plan from the Billing section to continue.' });
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

    // DEEP CLEAN: Target and remove the _proxy object from ANYWHERE in the payload for vehicle lookups
    if (type === 'vehicle') {
      data = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key === '_proxy') return undefined; // Completely removes the key
        return value;
      }));
    }

    // ✅ NEW DEEP CLEAN: Target and remove developer and task_id from bomber lookups
    if (type === 'bomber') {
      data = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key === 'developer' || key === 'task_id') return undefined; // Strips them silently
        return value;
      }));
    }

    // DEDUCT CREDIT: Only if the user does NOT have an active subscription
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

// ✅ UPDATED PROTECT REQUEST ROUTE (Matches your new frontend form + Discord Webhook)
router.post('/protect-request', async (req, res) => {
  try {
    const { fullName, email, telegram, dataToProtect, details } = req.body;
    
    // Save to database
    const request = await ProtectRequest.create({ fullName, email, telegram, dataToProtect, details });

    // Send Discord Webhook (Ensure DISCORD_WEBHOOK_URL is in your Vercel Environment Variables)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
          embeds: [{
            title: "🛡️ New Data Removal Request (199rs)",
            description: "A user has submitted a paid manual redaction request.",
            color: 0xec4899,
            fields: [
              { name: "Full Name", value: fullName, inline: true },
              { name: "Contact Email", value: email, inline: true },
              { name: "Telegram", value: telegram || "N/A", inline: true },
              { name: "Target Data", value: `\`${dataToProtect}\``, inline: false },
              { name: "Additional Details", value: details ? details : "None provided", inline: false }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: "MoonWitch OSINT Engine" }
          }]
        });
      } catch (webhookErr) {
        console.error("Discord Webhook failed to send:", webhookErr.message);
      }
    }

    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit protection request' });
  }
});

module.exports = router;
