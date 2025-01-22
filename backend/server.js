const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const apiRoutes = require('./routes/apiRoutes');  // Import the new routes

// MongoDB models
const User = require('./models/User');
const Hackathon = require('./models/Hackathon');

// Setup Express and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Setup MongoDB connection
mongoose.connect('mongodb://localhost:27017/hackathonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Zoom OAuth credentials (replace with your credentials)
const CLIENT_ID = 'bzeMJeo5QOK1l_OJBFactg';
const CLIENT_SECRET = '530tgWjeMzeIRTLiytPGH4wXVc7RLKKc';
const REDIRECT_URI = 'http://localhost:5173/callback';

// Test route to verify if the server is running
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Use API Routes for matchmaking and others
app.use('/api', apiRoutes);

// Zoom OAuth callback route
app.get('/callback', async (req, res) => {
  const { code } = req.query; // Capture the authorization code

  const data = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
  });

  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post('https://zoom.us/oauth/token', data, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Assume the user's email is passed in the query for simplicity
    const userEmail = req.query.email;

    // Find the user and update their Zoom token information
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.zoomAccessToken = access_token;
    user.zoomRefreshToken = refresh_token;
    user.zoomTokenExpiry = new Date(Date.now() + expires_in * 1000); // Calculate token expiry time
    await user.save();

    console.log('Zoom tokens saved for user:', userEmail);

    res.send('Successfully authenticated with Zoom and tokens saved!');
  } catch (error) {
    console.error('Error exchanging authorization code:', error.response ? error.response.data : error.message);
    res.status(500).send('Error during OAuth token exchange');
  }
});

// WebSocket for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (msg) => {
    console.log('Message from user:', msg);
    io.emit('chatMessage', msg); // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
