import React, { useState, useEffect } from 'react';

// Sample data for hackathons (replace with actual data fetching logic)
const onlineHackathons = [
  { id: 1, name: 'Virtual Code Sprint', description: 'An online hackathon focused on AI and ML.', startDate: 'Jan 25', endDate: 'Jan 28' },
  { id: 2, name: 'Tech Innovators', description: 'A hackathon for tech enthusiasts to build innovative products.', startDate: 'Feb 2', endDate: 'Feb 5' },
  { id: 3, name: 'Future Hack', description: 'A futuristic hackathon focusing on blockchain and crypto.', startDate: 'Mar 1', endDate: 'Mar 3' }
];

const offlineHackathons = [
  { id: 1, name: 'Hack the Planet', location: 'New York', description: 'An in-person event focusing on sustainability and clean tech.', date: 'Feb 10-12' },
  { id: 2, name: 'Code Fest', location: 'San Francisco', description: 'A hackathon with industry leaders, tech talks, and networking events.', date: 'Mar 5-7' }
];

const HackathonPage = () => {
  const [onlineList, setOnlineList] = useState(onlineHackathons);
  const [offlineList, setOfflineList] = useState(offlineHackathons);

  // Join Hackathon function (can be used for actual logic later)
  const handleJoin = (hackathonId) => {
    alert(`Joining hackathon with ID: ${hackathonId}`);
    // Here, you could trigger the actual join logic, like API call or route change
  };

  return (
    <div className="hackathon-page p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10">Current Hackathons</h1>
      
      {/* Online Hackathons Section */}
      <div className="online-hackathons mb-12">
        <h2 className="text-2xl font-semibold mb-6">🔴 Online Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineList.map((hackathon) => (
            <div key={hackathon.id} className="hackathon-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
              <p className="text-gray-600 mb-4">{hackathon.description}</p>
              <p className="text-gray-500 mb-4">🗓️ {hackathon.startDate} - {hackathon.endDate}</p>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleJoin(hackathon.id)}
              >
                Join Hackathon
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Hackathons Section */}
      <div className="offline-hackathons">
        <h2 className="text-2xl font-semibold mb-6">📢 Offline Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offlineList.map((hackathon) => (
            <div key={hackathon.id} className="offline-hackathon-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
              <p className="text-gray-600 mb-2">{hackathon.description}</p>
              <p className="text-gray-500 mb-1">📍 {hackathon.location}</p>
              <p className="text-gray-500 mb-4">🗓️ {hackathon.date}</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonPage;
