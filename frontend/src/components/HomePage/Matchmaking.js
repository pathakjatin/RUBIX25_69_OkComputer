import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import Chat from "./components/Chat.js";
const Matchmaking = ({ userId }) => {
  const [domain, setDomain] = useState("Full Stack WebDev");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`/matchmake?userId=${userId}&domain=${domain}`)
      .then((response) => setMatches(response.data))
      .catch((error) => console.error(error));
  }, [userId, domain]);

  return (
    <div>
      <h2>Find Teammates</h2>
      <select onChange={(e) => setDomain(e.target.value)}>
        <option>Data Science</option>
        <option>Full Stack WebDev</option>
        <option>Cyber Security</option>
        <option>AI/ML</option>
        <option>AR/VR</option>
        <option>Cloud Engineering</option>
      </select>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <h3>{match.teamName}</h3>
            <p>Members: {match.members.join(", ")}</p>
            <Chat roomId={`room-${match.teamName}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matchmaking;
