import React, { useState, useEffect } from 'react';

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

  // Dummy data
  const dummyUsers = [
    { _id: '1', name: 'Alice Johnson', domain: 'Full Stack Web Dev' },
    { _id: '2', name: 'Bob Smith', domain: 'Data Science' },
    { _id: '3', name: 'Charlie Brown', domain: 'AI-ML' },
    { _id: '4', name: 'Diana Prince', domain: 'AR-VR' },
    { _id: '5', name: 'Evan Harris', domain: 'Cyber Security' },
    { _id: '6', name: 'Fiona Clarke', domain: 'Cloud Engineering' },
    { _id: '7', name: 'George Baker', domain: 'Full Stack Web Dev' },
    { _id: '8', name: 'Hannah Lee', domain: 'Data Science' },
  ];

  // Simulate fetching data from a backend
  useEffect(() => {
    setUsers(dummyUsers); // Set dummy users
    setFilteredUsers(dummyUsers); // Initialize filtered users
  }, []);

  // Filter users based on selected domain
  useEffect(() => {
    if (selectedDomain) {
      const filtered = users.filter((user) => user.domain === selectedDomain);
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
          filteredUsers.map((user) => (
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
