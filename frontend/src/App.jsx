// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [domain, setDomain] = useState('Data Science');  // Default domain

  useEffect(() => {
    // Fetch users with the selected domain
    fetch(`http://localhost:3000/api/matchmaking?domain=${domain}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [domain]); // Runs every time the domain changes

  return (
    <div className="App">
      <h1>Matchmaking</h1>
      <h2>Selected Domain: {domain}</h2>
      
      {/* Dropdown to select domain */}
      <select onChange={(e) => setDomain(e.target.value)} value={domain}>
        <option value="Data Science">Data Science</option>
        <option value="AI/ML">AI/ML</option>
        <option value="Cyber Security">Cyber Security</option>
        <option value="Full Stack Web Development">Full Stack Web Development</option>
        <option value="Cloud Engineering">Cloud Engineering</option>
      </select>

      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>No users found in this domain</p>
        )}
      </ul>
    </div>
  );
}

export default App;
