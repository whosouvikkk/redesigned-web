const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/submit-payment', auth, async (req, res) => {
  const { planId, username, utr } = req.body;

  // Extra safety backend validation
  if (!utr || utr.length <= 4) {
    return res.status(400).json({ error: 'UTR / Transaction ID must be more than 4 digits.' });
  }

  // Ensure webhook exists in Vercel settings
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Missing DISCORD_WEBHOOK_URL environment variable");
    return res.status(500).json({ error: 'System error: Webhook not configured by admin.' });
  }

  try {
    // Format a nice embed-style message for Discord
    const discordMessage = {
      content: "🔔 **New Payment Verification Request**",
      embeds: [{
        title: "Transaction Details",
        color: 15418782, // A nice pink color
        fields: [
          { name: "👤 Username", value: `\`${username}\``, inline: true },
          { name: "📦 Requested Plan", value: `\`${planId}\``, inline: true },
          { name: "💳 UTR / Trans ID", value: `\`${utr}\``, inline: false },
        ],
        timestamp: new Date().toISOString()
      }]
    };

    await axios.post(webhookUrl, discordMessage);
    
    return res.json({ success: true, message: 'Payment submitted successfully.' });
  } catch (error) {
    console.error("Discord Webhook Error:", error);
    return res.status(500).json({ error: 'Failed to process payment request. Please try again.' });
  }
});

module.exports = router;
