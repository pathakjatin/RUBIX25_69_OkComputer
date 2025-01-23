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
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Matchmaking
      </h1>

      {/* Domain Filter */}
      <div className="mb-8">
        <label
          htmlFor="domain"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select Your Domain
        </label>
        <select
          id="domain"
          value={selectedDomain}
          onChange={handleDomainChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div
              key={user._id}
              className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h3>
              <p className="text-lg text-gray-600">{user.domain}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No users found for this domain.
          </p>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;
