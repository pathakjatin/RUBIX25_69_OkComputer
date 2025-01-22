const express = require('express');
const User = require('../models/User');
const Hackathon = require('../models/Hackathon');

const router = express.Router();

// Matchmaking route: Filters users by domain
router.get('/matchmaking', async (req, res) => {
  try {
    const { userId, domain } = req.query;
    if (!userId || !domain) {
      return res.status(400).json({ message: 'User ID and Domain are required' });
    }

    const users = await User.find({ domain }).where('_id').ne(userId); // Exclude the current user
    res.json(users);
  } catch (error) {
    console.error('Error fetching users for matchmaking:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Fetch all hackathons
router.get('/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({ message: 'Error fetching hackathons' });
  }
});

// Fetch hackathons user is enrolled in
router.get('/enrolled-hackathons', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('enrolledHackathons');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const enrolledHackathons = await Hackathon.find({
      _id: { $in: user.enrolledHackathons },
    });
    res.json(enrolledHackathons);
  } catch (error) {
    console.error('Error fetching enrolled hackathons:', error);
    res.status(500).json({ message: 'Error fetching enrolled hackathons' });
  }
});

module.exports = router;
