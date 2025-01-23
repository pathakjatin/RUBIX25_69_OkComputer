import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { Link } from 'react-router-dom';

// Timer function to calculate remaining time
const getTimeRemaining = (endDate) => {
  const now = new Date().getTime();
  const distance = endDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, distance };
};

const Leaderboard = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [leaderboardData, setLeaderboardData] = useState([]);

  const endDate = new Date('2025-02-01T00:00:00'); // Example end date

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard'); // Make sure the URL is correct
        console.log('Leaderboard data:', response.data); // Log the response for debugging
        setLeaderboardData(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(endDate);
      setTimeRemaining({
        days: remaining.days,
        hours: remaining.hours,
        minutes: remaining.minutes,
        seconds: remaining.seconds,
      });

      if (remaining.distance <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]); // Add any dependencies for effect, e.g., endDate or other state

  // Function to handle "Connect with Team" button click
  const handleConnectClick = () => {
    alert('Connecting you with the team...');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Timer Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">
            Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
          </h2>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Hackathon Leaderboard</h1>
          <p className="text-lg text-gray-600">Start Date: {new Date().toLocaleDateString()}</p>
          <p className="text-lg text-gray-600">End Date: {endDate.toLocaleDateString()}</p>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto flex justify-center">
          <table className="w-2/3 text-left table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-medium">Rank</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Team Name</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.rank} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 text-sm">{entry.rank}</td>
                  <td className="py-3 px-4 text-sm text-center">{entry.teamName}</td>
                  <td className="py-3 px-4 text-sm text-center">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Connect with Team Button */}
        <div className="text-center mt-6">
          <Link to = "/lobby">
          <button
            onClick={handleConnectClick}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Connect with Team
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
