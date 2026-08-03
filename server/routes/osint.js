const express = require('express');
const router = express.Router();
const axios = require('axios');

// Import your models and middleware
const auth = require('../middleware/auth');
const User = require('../models/User');
const History = require('../models/History');
const ProtectRequest = require('../models/ProtectRequest');
// const cleaner = require('../utils/cleaner'); // Uncomment if you use your cleaner utility

// ============================================================================
// 1. SEARCH ROUTE (With Fixed Resilient Subscription & Credit Logic)
// ============================================================================
router.post('/search', auth, async (req, res) => {
  try {
    const { type, query } = req.body;
    
    // 1. Fetch user from DB
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // FAILSAFE LOGIC: Trust the plan string first.
    // If they have no expiry date set in the DB, it defaults to active, preventing false lockouts.
    const hasPlan = user.subscription && user.subscription !== 'none';
    const isExpired = user.subscription !== 'lifetime' && 
                      user.subscriptionExpiry && 
                      new Date(user.subscriptionExpiry) < new Date();
                      
    const isSubActive = hasPlan && !isExpired;

    // 3. GATEKEEPER: Block if no active plan AND 0 credits
    if (!isSubActive && user.credits <= 0) {
      return res.status(403).json({ error: 'Access Paywall Active. Please purchase credits or a plan from the Billing section to continue.' });
    }

    // 4. DEDUCT CREDIT: Only deduct if the user does NOT have an active subscription
    if (!isSubActive) {
      user.credits -= 1;
      await user.save();
    }

    // ========================================================================
    // YOUR EXTERNAL API CALLS GO HERE
    // Replace this block with your actual external API requests
    // ========================================================================
    let resultData = {};

    if (type === 'number') {
      // Example: 
      // const apiRes = await axios.get(`https://your-osint-api.com/number?q=${query}`);
      // resultData = apiRes.data;
      resultData = { message: "Placeholder for Number lookup", query }; 

    } else if (type === 'vehicle') {
      // Example:
      // const apiRes = await axios.get(`https://your-osint-api.com/vehicle?q=${query}`);
      // resultData = cleaner(apiRes.data);
      resultData = { message: "Placeholder for Vehicle lookup", query };

    } else if (type === 'aadhar') {
      // Add your aadhar logic
    }
    // ========================================================================

    // 5. Log the successful search to History
    await History.create({
      userId: user._id,
      type,
      query,
      status: 'success'
    });

    // 6. Return the data to the frontend
    res.json(resultData);

  } catch (err) {
    console.error("Search error:", err);
    
    // Log the failed search to History
    if (req.user && req.user.id) {
      await History.create({
        userId: req.user.id,
        type: req.body.type,
        query: req.body.query,
        status: 'failed'
      }).catch(e => console.error("Failed to write history log:", e));
    }

    res.status(500).json({ error: 'Target protected or data not found.' });
  }
});

// ============================================================================
// 2. HISTORY ROUTE (Fetches user's previous searches)
// ============================================================================
router.get('/history', auth, async (req, res) => {
  try {
    // Fetch the latest 50 history logs for this specific user
    const history = await History.find({ userId: req.user.id })
                                 .sort({ createdAt: -1 })
                                 .limit(50);
    res.json(history);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// ============================================================================
// 3. DATA PROTECTION ROUTE (Manual Removal via Discord Webhook)
// ============================================================================
router.post('/protect-request', async (req, res) => {
  try {
    const { fullName, email, telegram, dataToProtect, details } = req.body;
    
    // Save the request to the MongoDB database
    const request = await ProtectRequest.create({ 
      fullName, 
      email, 
      telegram, 
      dataToProtect, 
      details 
    });

    // Fire the Discord Webhook notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
          embeds: [{
            title: "🛡️ New Data Removal Request (199rs)",
            description: "A user has submitted a paid manual redaction request.",
            color: 0xec4899, // MoonWitch Pink
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
    console.error("Protect request error:", err);
    res.status(500).json({ error: 'Failed to submit data removal request' });
  }
});

module.exports = router;
