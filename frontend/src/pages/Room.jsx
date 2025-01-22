import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Room = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:3000"); // Make sure the URL matches your backend

    // Listen for messages from the server
    socket.on("message", (msg) => {
      console.log('Message from server:', msg); // Log the message to check
      setMessage(msg); // Set the message state to the incoming message
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Room</h1>
      <p>{message}</p> {/* Display the message */}
    </div>
  );
};

export default Room;
