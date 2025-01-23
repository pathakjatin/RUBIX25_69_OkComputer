import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed

const Matchmaking = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const domains = [
    'Full Stack Web Dev',
    'Data Science',
    'AI-ML',
    'AR-VR',
    'Cyber Security',
    'Cloud Engineering',
  ];

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Update the URL to match your backend endpoint
        setUsers(response.data); // Set fetched users to the state
        setFilteredUsers(response.data); // Initialize filtered users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on selected domain
  useEffect(() => {
    if (selectedDomain) {
      const filtered = users.filter(user => user.domain === selectedDomain);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [selectedDomain, users]);

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Matchmaking</h1>

      {/* Domain Filter */}
      <div className="mb-6">
        <label htmlFor="domain" className="block text-lg font-medium mb-2">Select Your Domain</label>
        <select
          id="domain"
          value={selectedDomain}
          onChange={handleDomainChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Domains</option>
          {domains.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user._id} className="p-4 border border-gray-300 rounded-md">
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-gray-500">{user.domain}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found for this domain.</p>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;
