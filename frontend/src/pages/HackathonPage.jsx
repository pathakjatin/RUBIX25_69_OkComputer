import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HackathonPage = () => {
  const navigate = useNavigate(); // Hook to redirect
  const [onlineList, setOnlineList] = useState([
    { id: 1, name: 'Virtual Code Sprint', description: 'An online hackathon focused on AI and ML.', startDate: 'Jan 25', endDate: 'Jan 28' },
    { id: 2, name: 'Tech Innovators', description: 'A hackathon for tech enthusiasts to build innovative products.', startDate: 'Feb 2', endDate: 'Feb 5' },
    { id: 3, name: 'Future Hack', description: 'A futuristic hackathon focusing on blockchain and crypto.', startDate: 'Jan 24', endDate: 'Feb 2' }
  ]);
  
  const [offlineList, setOfflineList] = useState([
    { id: 1, name: 'Rubix 25 CSI-TSEC', location: 'Mumbai', description: 'A 48-hour online coding extravaganza set to redefine innovation.', date: 'Jan 22-26' },
    { id: 2, name: 'Code Fest', location: 'San Francisco', description: 'A hackathon with industry leaders, tech talks, and networking events.', date: 'Mar 5-7' }
  ]);

  // Join Hackathon function (redirect to JoinHackathonPage)
  const handleJoin = (hackathonId) => {
    // Redirecting to the join hackathon page with hackathonId
    navigate(`/join-hackathon/${hackathonId}`);
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
        <h2 className="text-2xl font-semibold mb-6">📢 Other Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offlineList.map((hackathon) => (
            <div key={hackathon.id} className="offline-hackathon-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
              <p className="text-gray-600 mb-2">{hackathon.description}</p>
              <p className="text-gray-500 mb-1">📍 {hackathon.location}</p>
              <p className="text-gray-500 mb-4">🗓️ {hackathon.date}</p>
              <a href='https://rubix25.devfolio.co/'>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Learn More
              </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonPage;
