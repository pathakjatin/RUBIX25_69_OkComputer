const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['participant', 'host', 'mentor'],
    required: true,
  },
  resume: {
    type: String, // URL or path to the resume
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
