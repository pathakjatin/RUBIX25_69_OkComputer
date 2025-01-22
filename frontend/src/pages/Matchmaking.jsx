import React, { useState, useEffect } from 'react';

const Matchmaking = () => {
  // State for selected domain and available users
  const [selectedDomain, setSelectedDomain] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Simulated user data (replace this with real data from your backend)
  const allUsers = [
    { id: 1, name: 'John Doe', domain: 'Full Stack Web Development' },
    { id: 2, name: 'Jane Smith', domain: 'Data Science' },
    { id: 3, name: 'Alice Johnson', domain: 'AI/ML' },
    { id: 4, name: 'Bob Brown', domain: 'Full Stack Web Development' },
    { id: 5, name: 'Charlie Davis', domain: 'Cyber Security' },
  ];

  // Domain options for filtering
  const domains = [
    'Full Stack Web Development',
    'Data Science',
    'AI/ML',
    'Cyber Security',
    'Cloud Engineering',
  ];

  // Effect to filter users based on selected domain
  useEffect(() => {
    if (selectedDomain) {
      const filtered = allUsers.filter(user => user.domain === selectedDomain);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [selectedDomain]);

  // Handler for domain change
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
            <div key={user.id} className="p-4 border border-gray-300 rounded-md">
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
