const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true, // Unique Firebase UID
    unique: true, // Ensure this is unique
  },
  domain: {
    type: String,
    required: true, // Domain selected by user
  },
  resume: {
    type: String, // URL or file path for the resume
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation time
  },
});

// Create model
const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
