const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables

// Initialize Express app first
const app = express();

// Enable CORS for specific origins (you can adjust this for production)
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the frontend URL/port if different
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust if needed for security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Import user routes
const userRoutes = require('./routes/userdata/Userdata.route');
app.use('/api', userRoutes); // Register the user routes under the /api prefix
const LeaderboardRoutes = require('./routes/leaderboard/Leaderboard.route');
app.use('/api', LeaderboardRoutes); // Register the user routes under the /api prefix
const HackathonRoutes = require('./routes/storehackathon/Hackathon.route');
app.use('/api',HackathonRoutes) ;// Register the hackathon routes

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

// Start the server on port 5000
server.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
