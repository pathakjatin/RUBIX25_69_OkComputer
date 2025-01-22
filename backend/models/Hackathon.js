const mongoose = require('mongoose');

// Hackathon Schema
const hackathonSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
