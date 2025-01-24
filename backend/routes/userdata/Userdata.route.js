const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
require('dotenv').config(); // Assuming you use dotenv for environment variables

// Mongo URI from environment variable
const uri = process.env.MONGO_URI;

// Helper function to get the user collection
async function getUserCollection() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db().collection('users');
}

// Route to get all user data (GET)
router.get('/userdata', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const userCollection = await getUserCollection();
    const users = await userCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Route to create a new user (POST)
router.post('/userdata', async (req, res) => {
  const { name, email, domain, github, linkedin, bio, resume, profilePic } = req.body;
  
  const client = new MongoClient(uri);

  try {
      console.log("Connecting to MongoDB...");
      await client.connect();  // Ensure MongoDB is accessible

      // Log the request body for debugging
      console.log('Request body:', req.body);

      const userCollection = client.db('Hackathon').collection('users'); // Ensure correct database and collection

      // Prepare user data
      const newUser = {
          name,
          email,
          domain,
          github,
          linkedin,
          bio,
          resumeURL: resume,
          profilePicURL: profilePic,
      };

      // Insert new user
      console.log("Inserting new user:", newUser);
      const result = await userCollection.insertOne(newUser);
      console.log("Insert Result:", result); // Log the result

      if (result.acknowledged) {
          res.status(201).json({ message: 'User created successfully', id: result.insertedId });
      } else {
          res.status(500).json({ message: 'User insertion failed' });
      }
  } catch (err) {
      console.error('Error creating user:', err); // Log full error
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
  } finally {
      await client.close();  // Ensure client is closed after operation
  }
});


// Route to update user profile (PUT)
router.put('/userdata', async (req, res) => {
  const { uid } = req.params;
  const { name, domain, github, linkedin, bio, resumeURL, profilePicURL } = req.body;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const userCollection = await getUserCollection();

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ uid });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the update object with provided fields
    const updateData = {
      name: name || existingUser.name,
      domain: domain || existingUser.domain,
      github: github || existingUser.github,
      linkedin: linkedin || existingUser.linkedin,
      bio: bio || existingUser.bio,
      resumeURL: resumeURL || existingUser.resumeURL,
      profilePicURL: profilePicURL || existingUser.profilePicURL,
    };

    // Update the user's profile with the new data
    const result = await userCollection.updateOne(
      { uid },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes made to the profile' });
    }

    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (err) {
    console.error('Error updating user profile:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally{
    await client.close();
  }
});

module.exports = router;
