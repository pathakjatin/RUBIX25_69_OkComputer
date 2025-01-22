const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

const CLIENT_ID = 'YOUR_ZOOM_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_ZOOM_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5173/callback';

// Route to handle OAuth callback
app.get('/callback', async (req, res) => {
  const { code } = req.query; // Capture the authorization code

  // Prepare data for token exchange
  const data = querystring.stringify({
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
  });

  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post('https://zoom.us/oauth/token', data, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token; // Use this token for making API requests
    console.log('Access Token:', accessToken);

    res.send('Successfully authenticated with Zoom!');
  } catch (error) {
    console.error('Error exchanging authorization code:', error.response ? error.response.data : error.message);
    res.status(500).send('Error during OAuth token exchange');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
