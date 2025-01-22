const CLIENT_ID = 'YOUR_ZOOM_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:5173/callback';

const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

function redirectToZoomAuth() {
    window.location.href = zoomAuthUrl;
  }
  