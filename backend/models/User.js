const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  domain: String,
  enrolledHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' }],
  zoomAccessToken: String,
  zoomRefreshToken: String,
  zoomTokenExpiry: Date,
});

module.exports = mongoose.model('User', userSchema);
