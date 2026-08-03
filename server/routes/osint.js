const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth'); // Adjust if your auth middleware is exported differently
const User = require('../models/User');
const History = require('../models/History');
const ProtectRequest = require('../models/ProtectRequest');
const cleaner = require('../utils/cleaner'); // Assuming you use this in your search route

// ============================================================================
// ⚠️ 1. YOUR EXISTING SEARCH ROUTE
// PASTE YOUR EXISTING `router.post('/search', ...)` LOGIC HERE.
// DO NOT OVERWRITE YOUR PROPRIETARY EXTERNAL API CALLS OR CLEANER LOGIC.
// ============================================================================

/* 
  Example of what your existing route looks like:
  router.post('/search', auth, async (req, res) => { ... });
*/


// ============================================================================
// ⚠️ 2. YOUR EXISTING HISTORY ROUTE
// PASTE YOUR EXISTING `router.get('/history', ...)` LOGIC HERE.
// ============================================================================

/* 
  Example of what your existing route looks like:
  router.get('/history', auth, async (req, res) => { ... });
*/


// ============================================================================
// ✅ 3. NEW DATA REMOVAL ROUTE (WITH DISCORD WEBHOOK)
// THIS REPLACES YOUR OLD /protect-request ROUTE.
// ============================================================================

router.post('/protect-request', async (req, res) => {
  try {
    // 1. Extract the newly defined fields from the frontend
    const { fullName, email, telegram, dataToProtect, details } = req.body;
    
    // 2. Save the request to the MongoDB database
    const request = await ProtectRequest.create({ 
      fullName, 
      email, 
      telegram, 
      dataToProtect, 
      details 
    });

    // 3. Fire the Discord Webhook notification
    // Ensure DISCORD_WEBHOOK_URL is set in your .env file
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
          embeds: [{
            title: "🛡️ New Data Removal Request (199rs)",
            description: "A user has submitted a paid redaction request.",
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
        // We do not throw an error to the frontend here, so the user still sees a success message
        // even if the Discord API fails or rate-limits the webhook.
      }
    }
    
    res.json({ success: true, request });
  } catch (err) {
    console.error("Protect request error:", err);
    res.status(500).json({ error: 'Failed to submit data removal request' });
  }
});

module.exports = router;
