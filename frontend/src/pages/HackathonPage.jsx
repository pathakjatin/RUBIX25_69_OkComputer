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
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-12">
        Explore Hackathons
      </h1>
      {hackathons.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">
          Loading or no hackathons found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {hackathon.name}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {hackathon.description}
              </p>
              <a
                href="http://localhost:5173/join-hackathon"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-600 transition"
              >
                Join Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackathonPage;
