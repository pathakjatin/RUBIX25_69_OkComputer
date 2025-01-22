const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Added for handling CORS
const userDataRoutes = require('./src/participants/UserData.route'); // Import the user data routes

dotenv.config(); // Load environment variables

const app = express();
const CLIENT_ID = 'YOUR_ZOOM_CLIENT_ID'; // Hardcoded Zoom Client ID
const CLIENT_SECRET = 'YOUR_ZOOM_CLIENT_SECRET'; // Hardcoded Zoom Client Secret
const REDIRECT_URI = 'http://localhost:5173/callback'; // Your frontend callback URL

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Basic route
app.get('/', (req, res) => {
  res.send("Hello");
});

// MongoDB connection
async function main() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
main().then(() => console.log("MongoDB connected")).catch(err => console.log(err));

// OAuth callback route for Zoom
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

// Use the user data routes
app.use('/api', userDataRoutes); // Prefix all user data routes with '/api'

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
