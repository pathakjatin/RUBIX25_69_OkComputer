const mongoose = require('mongoose');

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  team_name: String,
  score: Number,
  members: [String],
  created_at: { type: Date, default: Date.now },
});

// Leaderboard Model
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
