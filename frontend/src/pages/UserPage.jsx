import React from "react";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">
          Manage your profile, explore hackathon opportunities, and stay connected with your team.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            View Hackathons
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
            Manage Profile
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition">
            Join a Team
          </button>
        </div>

        {/* Key Sections */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">Notifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>You have been invited to join a team!</li>
              <li>Upcoming hackathon: "Tech Innovators Summit"</li>
              <li>Your profile has been updated successfully.</li>
            </ul>
          </div>

          {/* Upcoming Hackathons */}
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Upcoming Hackathons</h2>
            <p className="text-gray-700">Don't miss these events:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>AI Challenge 2025 - Starts Feb 10</li>
              <li>Web Dev Sprint - Starts Mar 5</li>
              <li>Cloud Hackathon - Starts Apr 12</li>
            </ul>
          </div>

          {/* Team Management */}
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-green-800 mb-4">Your Teams</h2>
            <p className="text-gray-700">You are part of the following teams:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Team Innovators</li>
              <li>Cloud Wizards</li>
              <li>Data Gurus</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-purple-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Resources</h2>
            <p className="text-gray-700">Helpful links:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>
                <a
                  href="https://developer.mozilla.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  MDN Web Docs
                </a>
              </li>
              <li>
                <a
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  React Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  TailwindCSS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
