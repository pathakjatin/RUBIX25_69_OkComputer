const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const { storeHackathon } = require('../../models/Hackathon.js'); // Import the model

// Route to handle creating a new hackathon
router.post('/hackathon', async (req, res) => {
  const uri = 'mongodb+srv://yash6961:tznzeQKM1xEiXqHk@cluster0.z6zws.mongodb.net/Hackathon?retryWrites=true&w=majority&appName=Cluster0';
  
  // Initialize MongoDB client
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();

    // Get the collection from the connected client
    const hackathonCollection = await storeHackathon(client);
    
    // Prepare the new hackathon object from the request body
    const newHackathon = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    
    // Insert the new hackathon into the database
    const result = await hackathonCollection.insertOne(newHackathon);
    
    // Send back the response with the inserted ID
    res.status(201).json({ message: 'Hackathon created successfully', id: result.insertedId });
  } catch (err) {
    // Handle any errors during database operations
    console.error('Error creating hackathon:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Ensure the MongoDB client gets closed after the operation
    await client.close();
  }
});

module.exports = router;
