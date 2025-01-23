const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Express app and server
const app = express();
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
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Make this configurable for production
  methods: ['GET', 'POST'],
}));

// Import user routes
const userRoutes = require('./src/participants/UserData.route');
app.use('/api', userRoutes); // Register the user routes under the /api prefix

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// MongoDB connection error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection lost. Attempting to reconnect...');
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

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server on port 5000
server.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
