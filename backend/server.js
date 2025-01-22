require('dotenv').config(); // To load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const querystring = require('querystring');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importing CORS middleware
const userDataRoutes = require('./src/participants/UserData.route'); // Import user data routes
const http = require('http'); // Import the http module to work with Socket.IO
const socketIo = require('socket.io'); // Import Socket.IO

dotenv.config();


const app = express();

// MongoDB connection using environment variable
const MONGO_URI = process.env.DB_URL; // Access DB_URL from .env file

if (!MONGO_URI) {
  console.error('DB_URL is not defined in the environment variables.');
  process.exit(1); // Exit the application if the URI is not defined
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

// Zoom OAuth configuration
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/callback'; // Adjust if needed

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Zoom CLIENT_ID or CLIENT_SECRET is not defined in the environment variables.');
  process.exit(1); // Exit the application if OAuth configuration is incomplete
}
>>>>>>> Stashed changes

const app = express(); // Initialize the Express application

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Basic route
app.get('/', (req, res) => {
  res.send("Hello");
});

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
main();

// OAuth callback route for Zoom
app.get('/callback', async (req, res) => {
  const { code } = req.query;

<<<<<<< Updated upstream
=======
  if (!code) {
    console.error('Authorization code is missing in the request');
    return res.status(400).send('Authorization code is missing');
  }

  // Prepare data for token exchange
>>>>>>> Stashed changes
  const data = querystring.stringify({
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
  });

  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

  try {
    const response = await axios.post('https://zoom.us/oauth/token', data, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token; 
    console.log('Access Token:', accessToken);
    res.send('Successfully authenticated with Zoom!');
  } catch (error) {
    console.error('Error exchanging authorization code:', error.response ? error.response.data : error.message);
    res.status(500).send('Error during OAuth token exchange');
  }
});

<<<<<<< Updated upstream
// Use the user data routes
app.use('/api', userDataRoutes); // Prefix all user data routes with '/api'

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server);

// Set up Socket.IO event listeners
io.on('connection', (socket) => {
  console.log("New user connected");

  // Emit a welcome message to the newly connected user
  socket.emit("message", "Welcome to the room!");

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
=======
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
>>>>>>> Stashed changes
  console.log(`Backend server running on http://localhost:${PORT}`);
});
