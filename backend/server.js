const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const Token = require('./models/token'); // Import Token model

dotenv.config(); // Load environment variables

// Initialize Express app and server
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // React's dev server
  methods: ['GET', 'POST'],
}));

// Import user routes
const userRoutes = require('./src/participants/UserData.route'); // Ensure the path is correct
app.use('/api', userRoutes); // Register the user routes under the /api prefix

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Server-to-Server OAuth - Get Access Token and Store It
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

async function getZoomAccessToken() {
  const url = 'https://zoom.us/oauth/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

  try {
    const response = await axios.post(url, params, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, expires_in, token_type } = response.data;

    // Save the token to the database
    const token = new Token({
      access_token,
      expires_in,
      token_type,
    });

    await token.save();

    console.log('Access Token:', access_token);
    return access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to obtain Zoom access token');
  }
}

// Check if the token is valid or expired
async function getValidZoomAccessToken() {
  const storedToken = await Token.findOne().sort({ created_at: -1 });

  if (storedToken) {
    const currentTime = Date.now();
    const tokenAge = currentTime - storedToken.created_at.getTime();

    // If token is expired, fetch a new one
    if (tokenAge < storedToken.expires_in * 1000) {
      console.log('Using stored access token');
      return storedToken.access_token;
    } else {
      console.log('Stored token expired. Fetching a new one...');
      return await getZoomAccessToken();
    }
  } else {
    console.log('No token found. Fetching a new one...');
    return await getZoomAccessToken();
  }
}

// Create a Zoom meeting
async function createZoomMeeting() {
  const accessToken = await getValidZoomAccessToken();

  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Server-to-Server OAuth Test Meeting',
        type: 2, // Scheduled meeting
        start_time: '2025-01-30T10:00:00Z', // ISO 8601 format
        duration: 30, // in minutes
        timezone: 'UTC',
        agenda: 'Test meeting agenda',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          audio: 'voip',
          auto_recording: 'none',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Zoom meeting created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.response ? error.response.data : error.message);
    throw new Error('Error creating Zoom meeting');
  }
}

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Send a welcome message to the client who just connected
  socket.emit('message', 'Welcome to the room!');

  // Broadcast the received message to all other clients
  socket.on('chat_message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);  // Broadcast the message to all connected clients
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to create a Zoom meeting
app.get('/create-meeting', async (req, res) => {
  try {
    const meetingDetails = await createZoomMeeting();
    res.json(meetingDetails);  // Send meeting details as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Error creating Zoom meeting' });
  }
});

// Start the server on port 3000
server.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
