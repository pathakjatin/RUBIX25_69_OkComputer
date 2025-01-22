const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // For handling cross-origin requests
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const querystring = require('querystring');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from any origin (you can specify a specific domain if needed)
    methods: ["GET", "POST"], // Allow GET and POST requests
    allowedHeaders: ["Content-Type"],
    credentials: true // Allow credentials if needed
  }
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Change this to match your frontend URL (React's dev server)
  methods: ['GET', 'POST'],
}));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
main();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

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

// OAuth callback route for Zoom (if needed for OAuth integration)
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const data = querystring.stringify({
    code: code,
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

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
