// models/token.js
const mongoose = require('mongoose');

// Create a schema for storing Zoom access token
const tokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  token_type: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Model for token
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
