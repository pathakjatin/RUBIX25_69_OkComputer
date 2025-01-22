import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');  // Connect to your backend server

const Chat = () => {
  useEffect(() => {
    // Emit an event to join a specific room
    socket.emit('joinRoom', 'room123');  // You can dynamically assign room names

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('Received message:', message);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('chatMessage', { room: 'room123', message });  // Sending a message to the room
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <button onClick={() => sendMessage('Hello, everyone!')}>Send Message</button>
    </div>
  );
};

export default Chat;
