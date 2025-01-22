import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function UserDashboard() {
  const [enrolledHackathons, setEnrolledHackathons] = useState([]);
  const [availableHackathons, setAvailableHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const userId = "user1";

  useEffect(() => {
    // Fetch hackathons
    async function fetchHackathons() {
      try {
        const response = await axios.get("http://localhost:3000/api/hackathons", {
          params: { userId },
        });
        setEnrolledHackathons(response.data.enrolledHackathons);
        setAvailableHackathons(response.data.availableHackathons);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHackathons();

    // Socket.IO for real-time chat
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("chatMessage", chatInput);
    setChatInput("");
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <section>
        <h2>Enrolled Hackathons</h2>
        {enrolledHackathons.length > 0 ? (
          <ul>
            {enrolledHackathons.map((hackathon) => (
              <li key={hackathon.id}>
                <h3>{hackathon.name}</h3>
                <p>{hackathon.description}</p>
                <button>View Details</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You are not enrolled in any hackathons yet.</p>
        )}
      </section>

      <section>
        <h2>Available Hackathons</h2>
        {availableHackathons.length > 0 ? (
          <ul>
            {availableHackathons.map((hackathon) => (
              <li key={hackathon.id}>
                <h3>{hackathon.name}</h3>
                <p>{hackathon.description}</p>
                <button>Enroll</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hackathons available at the moment.</p>
        )}
      </section>

      <section>
        <h2>Chat Room</h2>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </section>
    </div>
  );
}
