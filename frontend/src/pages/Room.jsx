import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('general');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for incoming messages from the server
    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Join the room when socket is connected
    newSocket.emit('join_room', room);

    return () => newSocket.close(); // Clean up on component unmount
  }, [room]);

  const handleSendMessage = () => {
    if (message.trim() && user.trim()) {
      // Emit the chat message to the server
      socket.emit('chat_message', { room, message, sender: user });
      setMessage('');
    } else {
      alert('Please enter both a username and a message.');
    }
  };

  const handleCreateMeeting = () => {
    // Placeholder function for creating a meeting (if you have specific logic)
    alert('Create meeting functionality coming soon!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Chat Room: {room}</h2>

        {/* User and Room input */}
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 w-1/2 mr-2"
            placeholder="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 w-1/2"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        {/* Messages display */}
        <div className="overflow-y-auto h-64 mb-4 p-4 border-2 border-gray-300 rounded-md bg-gray-50">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded-lg">
                <strong>{msg.sender}: </strong>{msg.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Message input */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>

        {/* Create Meeting Button */}
        <div className="mt-4">
          <button
            onClick={handleCreateMeeting}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
