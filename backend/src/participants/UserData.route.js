const express = require("express");
const User = require("./UserData.model"); // Ensure this path is correct based on your structure
const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords
const router = express.Router();

// Middleware for validating inputs
function validateUserInput(req, res, next) {
  const { role, email, name, phoneNumber, domain, password, organizationName, qualifications, resume } = req.body;

  // Check if the basic required fields are provided
  if (!role || !email || !name || !phoneNumber || !domain || !password) {
    return res.status(400).json({ message: "role, email, name, phoneNumber, domain, and password are required." });
  }

  // Check for valid role
  if (!['participant', 'host', 'mentor'].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  // Role-specific validation
  if (role === 'host' && !organizationName) {
    return res.status(400).json({ message: "organizationName is required for role 'host'." });
  }
  
  if (role === 'mentor' && !qualifications) {
    return res.status(400).json({ message: "qualifications are required for role 'mentor'." });
  }

  if (role === 'participant' && !resume) {
    return res.status(400).json({ message: "resume is required for role 'participant'." });
  }

  next();
}

// Create or Update User Data with input validation
router.post("/user", validateUserInput, async (req, res) => {
  const {
    role, email, name, phoneNumber, domain, github, linkedin, bio, qualifications, organizationName, resume, profilePic, password
  } = req.body;

  // Ensure that resume is always a string or empty string if not provided
  const resumeValue = typeof resume === "string" ? resume : "";

  try {
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      name,
      phoneNumber,
      domain,
      role,
      password: hashedPassword, // Use the hashed password
      github,
      linkedin,
      bio,
      qualifications: role === 'mentor' ? qualifications : undefined,
      organizationName: role === 'host' ? organizationName : undefined,
      resume: resumeValue,
      profilePic,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Fetch user data by MongoDB ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // Find user by MongoDB _id
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update user data by MongoDB ID
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const {
    domain, resume, github, linkedin, bio, qualifications, organizationName, profilePic
  } = req.body;

  try {
    let user = await User.findById(id); // Find user by MongoDB _id
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields
    user.domain = domain || user.domain;
    user.resume = resume || user.resume;
    user.github = github || user.github;
    user.linkedin = linkedin || user.linkedin;
    user.bio = bio || user.bio;
    user.qualifications = qualifications || user.qualifications;
    user.organizationName = organizationName || user.organizationName;
    user.profilePic = profilePic || user.profilePic;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
