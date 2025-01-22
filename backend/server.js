// backend/server.js
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const socketIo = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const matchmakingRouter = require('./routes/matchmaking'); // Path to matchmaking route

// MongoDB user model
const User = require('./models/User'); // Import User model

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO

const CLIENT_ID = 'YOUR_ZOOM_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_ZOOM_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5173/callback';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => res.send('Backend is running'));

// Matchmaking route for domain-based matchmaking
app.use('/api', matchmakingRouter);

// Zoom OAuth Callback
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

// WebSocket functionality
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (msg) => {
    console.log('Message from user:', msg);
    io.emit('chatMessage', msg);  // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
