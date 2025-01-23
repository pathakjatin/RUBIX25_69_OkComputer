import React, { useState, useEffect } from 'react';

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

  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, teamName: 'Team Alpha' },
    { rank: 2, teamName: 'Team Beta' },
    { rank: 3, teamName: 'Team Gamma' },
    { rank: 4, teamName: 'Team Delta' },
  ]);

  const endDate = new Date('2025-02-01T00:00:00'); // Example end date

  useEffect(() => {
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
  }, [endDate]);

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
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-5 text-sm font-medium">Rank</th>
                <th className="py-3 px-5 text-sm font-medium">Team Name</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.rank} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-5 text-sm">{entry.rank}</td>
                  <td className="py-3 px-5 text-sm">{entry.teamName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
