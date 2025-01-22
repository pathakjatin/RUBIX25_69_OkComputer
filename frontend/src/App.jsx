import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [domains, setDomains] = useState(['Data Science', 'AI/ML', 'Cyber Security', 'Full Stack Web Development', 'Cloud Engineering']);
  const [domain, setDomain] = useState('Data Science');
  const [hackathons, setHackathons] = useState([]);
  const [enrolledHackathons, setEnrolledHackathons] = useState([]);
  const [userId, setUserId] = useState(null); // Assuming you have a way to get the user ID

  useEffect(() => {
    // Fetch users by domain
    fetch(`http://localhost:3000/api/matchmaking?domain=${domain}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Fetch available hackathons
    fetch('http://localhost:3000/api/hackathons')
      .then((response) => response.json())
      .then((data) => setHackathons(data))
      .catch((error) => console.error('Error fetching hackathons:', error));

    // Fetch hackathons the user is enrolled in
    if (userId) {
      fetch(`http://localhost:3000/api/enrolled-hackathons?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setEnrolledHackathons(data))
        .catch((error) => console.error('Error fetching enrolled hackathons:', error));
    }
  }, [domain, userId]);

  return (
    <div className="App">
      <h1>User Dashboard</h1>

      {/* Domain selection for matchmaking */}
      <h2>Selected Domain: {domain}</h2>
      <select onChange={(e) => setDomain(e.target.value)} value={domain}>
        {domains.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* List of users */}
      <h3>Users in {domain}:</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <p>No users found in this domain.</p>
        )}
      </ul>

      {/* List of hackathons */}
      <h3>Available Hackathons:</h3>
      {hackathons.length > 0 ? (
        <ul>
          {hackathons.map((hackathon) => (
            <li key={hackathon._id}>
              {hackathon.name} - {hackathon.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hackathons available at the moment.</p>
      )}

      {/* List of enrolled hackathons */}
      <h3>Your Enrolled Hackathons:</h3>
      {enrolledHackathons.length > 0 ? (
        <ul>
          {enrolledHackathons.map((hackathon) => (
            <li key={hackathon._id}>
              {hackathon.name} - {hackathon.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any hackathons.</p>
      )}
    </div>
  );
}

export default App;
