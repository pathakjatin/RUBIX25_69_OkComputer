import React, { useState, useEffect } from 'react';

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hackathon');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Hackathons
      </h1>
      {hackathons.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Loading or no hackathons found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-200"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                {hackathon.name}
              </h3>
              <p className="text-gray-700 mb-4">{hackathon.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackathonPage;
