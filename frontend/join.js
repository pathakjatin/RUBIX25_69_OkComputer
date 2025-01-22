// join.js (Frontend)
async function joinZoomMeeting(accessToken) {
    const meetingData = {
      topic: 'My Zoom Meeting',
      type: 2,  // Scheduled meeting
      start_time: '2025-01-25T15:00:00Z',  // ISO 8601 format
      duration: 30,  // Duration in minutes
      password: '123456',
      settings: {
        host_video: true,
        participant_video: true,
        mute_upon_entry: false,
        audio: 'voip',
        auto_recording: 'none'
      }
    };
  
    const createMeetingUrl = 'https://api.zoom.us/v2/users/me/meetings';
    const headers = {
      'Authorization': `Bearer ${accessToken}`, // Pass the access token in the Authorization header
      'Content-Type': 'application/json'
    };
  
    try {
      const response = await fetch(createMeetingUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(meetingData),
      });
  
      const data = await response.json();
      if (data.join_url) {
        console.log('Meeting Created Successfully:', data);
      } else {
        console.error('Error creating meeting:', data);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  }
  