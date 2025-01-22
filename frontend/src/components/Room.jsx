import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// Room component for video chat and chatting
const Room = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);

  // Handle incoming chat messages
  useEffect(() => {
    // Connect to the backend socket
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    // Join room based on URL path (room ID)
    const roomId = window.location.pathname.split('/').pop();
    socket.emit('joinRoom', roomId);

    // Handle incoming chat messages
    socket.on('chatMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    // Initialize WebRTC and start video call
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;

      const peer = new RTCPeerConnection();
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      peer.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerRef.current = peer;
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send a new chat message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current.emit('chatMessage', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Room</h1>

      {/* Video Chat */}
      <div>
        <h2>Your Video</h2>
        <video ref={localVideoRef} autoPlay muted />
      </div>

      <div>
        <h2>Remote Video</h2>
        <video ref={remoteVideoRef} autoPlay />
      </div>

      {/* Chat Section */}
      <div>
        <h2>Chat</h2>
        <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #ccc' }}>
          {chatMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Room;
