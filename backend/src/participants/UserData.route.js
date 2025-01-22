const express = require("express");
const UserData = require("./UserData.model"); // Import your MongoDB model

const router = express.Router();

// Route to create a new user document
router.post("/user", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug statement to check the request body
    const { firebaseUid, domain, resume } = req.body;

    // Check if user already exists (to avoid duplicate entries)
    const existingUser = await UserData.findOne({ firebaseUid });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new UserData({
      firebaseUid,
      domain,
      resume,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
