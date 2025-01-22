import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import Chat from './Chat';

const Matchmaking = ({ userId }) => {
  const [domain, setDomain] = useState('Full Stack WebDev');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/matchmaking?userId=${userId}&domain=${domain}`)
      .then((response) => setMatches(response.data))
      .catch((error) => console.error('Error fetching matches:', error));
  }, [userId, domain]);

  return (
    <div>
      <h2>Find Teammates</h2>
      <select onChange={(e) => setDomain(e.target.value)} value={domain}>
        <option value="Data Science">Data Science</option>
        <option value="Full Stack WebDev">Full Stack WebDev</option>
        <option value="Cyber Security">Cyber Security</option>
        <option value="AI/ML">AI/ML</option>
        <option value="AR/VR">AR/VR</option>
        <option value="Cloud Engineering">Cloud Engineering</option>
      </select>

      <ul>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <li key={index}>
              <h3>{match.name}</h3>
              <p>Domain: {match.domain}</p>
              <Chat roomId={`room-${match._id}`} />
            </li>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </ul>
    </div>
  );
};

export default Matchmaking;
