import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:3000'); // Assuming the server is running locally

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', { roomId, message });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
