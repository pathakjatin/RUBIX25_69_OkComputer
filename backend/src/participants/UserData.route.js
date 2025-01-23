const express = require("express");
const multer = require("multer");
const User = require("../../models/UserData.model"); // Ensure the path matches your project structure
const bcrypt = require("bcryptjs");
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware to validate user input
const validateUserInput = (req, res, next) => {
  const { role, email, name, phoneNumber, domain, password, organizationName, qualifications, resume } = req.body;

  if (!role || !email || !name || !phoneNumber || !domain || !password) {
    return res.status(400).json({ message: "Required fields: role, email, name, phoneNumber, domain, and password." });
  }

  if (!["participant", "host", "mentor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  if (role === "host" && !organizationName) {
    return res.status(400).json({ message: "Organization name is required for the 'host' role." });
  }

  if (role === "mentor" && !qualifications) {
    return res.status(400).json({ message: "Qualifications are required for the 'mentor' role." });
  }

  if (role === "participant" && !resume) {
    console.warn("No resume provided for participant role, proceeding without it.");
  }

  next();
};

// Route to create a new user
router.post("/user", upload.single("resume"), validateUserInput, async (req, res) => {
  const {
    role,
    email,
    name,
    phoneNumber,
    domain,
    github,
    linkedin,
    qualifications,
    organizationName,
    password,
  } = req.body;

  const profilePic = req.file ? req.file.path : null;
  const resume = req.file ? req.file.path : null;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword, // Save the hashed password
      github,
      linkedin,
      domain,
      role,
      qualifications: role === "mentor" ? qualifications : undefined,
      organizationName: role === "host" ? organizationName : undefined,
      resume: role === "participant" ? resume : undefined,
      profilePic,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: newUser });

  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., email already exists)
      return res.status(400).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Internal server error, please try again later." });
  }
});


// Route to fetch user data by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to update user data by ID
router.put("/user/:id", upload.single("profilePic"), async (req, res) => {
  const { id } = req.params;
  const {
    domain,
    github,
    linkedin,
    qualifications,
    organizationName,
  } = req.body;

  const profilePic = req.file ? req.file.path : null;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.domain = domain || user.domain;
    user.github = github || user.github;
    user.linkedin = linkedin || user.linkedin;
    user.qualifications = qualifications || user.qualifications;
    user.organizationName = organizationName || user.organizationName;
    if (profilePic) user.profilePic = profilePic;

    await user.save();
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
// Route to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


module.exports = router;
