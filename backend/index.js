// Import required modules
const express = require('express');
const dotenv = require('dotenv');

// Initialize the app
const app = express();
dotenv.config(); // Load environment variables

// Middleware to parse JSON
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! The server is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
