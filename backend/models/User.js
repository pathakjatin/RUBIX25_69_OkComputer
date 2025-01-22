// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  domain: { type: String, required: true },  // Domain for filtering matchmaking
});

const User = mongoose.model('User', userSchema);

module.exports = User;
