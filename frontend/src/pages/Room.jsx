import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Backend server URL

const Room = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    // Send message to the server
    socket.emit("chatMessage", message);

    // Add the message to the chat log locally
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
    setMessage(""); // Clear input field
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Chat Room</h1>

      {/* Chat Messages */}
      <div className="w-full max-w-2xl h-96 overflow-y-auto bg-white border border-gray-300 p-4 rounded-lg shadow-md mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2 text-gray-700">
            {msg}
          </p>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
