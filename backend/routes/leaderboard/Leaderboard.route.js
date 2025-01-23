const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard'); // Correct path to the Leaderboard model

// Route to fetch leaderboard data
router.get('/leaderboard', async (req, res) => {
  try {
    // Fetch and sort leaderboard entries by score in descending order
    const leaderboard = await Leaderboard.find().sort({ score: -1 }); // Sort by score

    // Add rank to each team based on their position in the sorted list
    const leaderboardWithRank = leaderboard.map((team, index) => ({
      rank: index + 1,  // Rank is index + 1 (1-based index)
      teamName: team.team_name,
      score: team.score,
      members: team.members,
    }));

    res.json(leaderboardWithRank); // Send leaderboard data as response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching leaderboard data' });
  }
});

module.exports = router;
