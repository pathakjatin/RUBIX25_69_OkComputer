// backend/routes/matchmaking.js
const express = require('express');
const User = require('../models/User'); // Path to User model

const router = express.Router();

// Matchmaking route that takes domain as a query parameter
router.get('/matchmaking', async (req, res) => {
  const { domain } = req.query;

  try {
    // Find users with the same domain
    const matchedUsers = await User.find({ domain });

    if (matchedUsers.length === 0) {
      return res.status(404).json({ message: 'No users found with the same domain' });
    }

    // Return the matched users
    res.json(matchedUsers);
  } catch (err) {
    console.error('Error during matchmaking:', err);
    res.status(500).json({ message: 'Error during matchmaking' });
  }
});

module.exports = router;
