const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  domain: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// Route to get users by domain
router.get("/users", async (req, res) => {
  const { domain } = req.query;

  try {
    const users = domain ? await User.find({ domain }) : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Export the router
module.exports = router;
