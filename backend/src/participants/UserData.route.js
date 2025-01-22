const express = require("express");
const User = require("./UserData.model"); // Ensure this path is correct based on your structure
const router = express.Router();

// Middleware for validating inputs
function validateUserInput(req, res, next) {
  const { firebaseUid, role, email, name, domain } = req.body;
  if (!firebaseUid || !role || !email || !name || !domain) {
    return res.status(400).json({ message: "firebaseUid, role, email, name, and domain are required." });
  }
  if (!['participant', 'host', 'mentor'].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }
  next();
}

// Create or Update User Data with input validation
router.post("/user", validateUserInput, async (req, res) => {
  const { firebaseUid, role, email, name, phone, domain, resume } = req.body;

  // Ensure that resume is always a string or empty string if not provided
  const resumeValue = typeof resume === "string" ? resume : "";

  try {
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update existing user
      user.resume = resumeValue || user.resume;
      user.phone = phone || user.phone;
      user.domain = domain || user.domain;
      user.role = role || user.role;
      await user.save();
      return res.status(200).json(user);
    }

    // Create new user
    const newUser = new User({
      firebaseUid,
      email,
      name,
      phone,
      domain,
      role,
      resume: resumeValue,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
