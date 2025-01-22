const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

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
const CLIENT_ID = 'YOUR_ZOOM_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_ZOOM_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5173/callback';

// Test route to verify if the server is running
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Matchmaking route: Filters users by domain
app.get('/api/matchmaking', async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ message: 'Domain is required' });
    }

    const users = await User.find({ domain });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Hackathons route: Fetch all hackathons
app.get('/api/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({ message: 'Error fetching hackathons' });
  }
});

// Enrolled hackathons route: Fetch hackathons user is enrolled in
app.get('/api/enrolled-hackathons', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('enrolledHackathons');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const enrolledHackathons = await Hackathon.find({
      _id: { $in: user.enrolledHackathons },
    });
    res.json(enrolledHackathons);
  } catch (error) {
    console.error('Error fetching enrolled hackathons:', error);
    res.status(500).json({ message: 'Error fetching enrolled hackathons' });
  }
});

// Create new user route (for testing)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, domain } = req.body;
    const user = new User({ name, email, domain });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Create new hackathon route (for testing)
app.post('/api/hackathons', async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const hackathon = new Hackathon({ name, description, date });
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(500).json({ message: 'Error creating hackathon' });
  }
});

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

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);

    res.send('Successfully authenticated with Zoom!');
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
