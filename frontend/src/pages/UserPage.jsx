import React from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 text-lg text-center">
          Manage your profile, explore hackathon opportunities, and stay connected with your team.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link to="/hackdisplay">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:scale-105">
              View Hackathons
            </button>
          </Link>
          <Link to="/userprofile">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 hover:shadow-lg transition-transform transform hover:scale-105">
              Edit Profile
            </button>
          </Link>
          <Link to="/matchmaking">
            <button className="bg-purple-500 text-white px-6 py-3 rounded-full shadow hover:bg-purple-600 hover:shadow-lg transition-transform transform hover:scale-105">
              Join a Team
            </button>
          </Link>
        </div>

        {/* Key Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Notifications */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Notifications</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You have been invited to join a team!</li>
              <li>Upcoming hackathon: "Tech Innovators Summit"</li>
              <li>Your profile has been updated successfully.</li>
            </ul>
          </div>

          {/* Upcoming Hackathons */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md border-l-4 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Upcoming Hackathons</h2>
            <p className="text-gray-700">Don't miss these events:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>AI Challenge 2025 - Starts Feb 10</li>
              <li>Web Dev Sprint - Starts Mar 5</li>
              <li>Cloud Hackathon - Starts Apr 12</li>
            </ul>
          </div>

          {/* Team Management */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-400">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Your Teams</h2>
            <p className="text-gray-700">You are part of the following teams:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Team Innovators</li>
              <li>Cloud Wizards</li>
              <li>Data Gurus</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-md border-l-4 border-purple-400">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Resources</h2>
            <p className="text-gray-700">Helpful links:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>
                <a
                  href="https://developer.mozilla.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline hover:text-purple-800"
                >
                  MDN Web Docs
                </a>
              </li>
              <li>
                <a
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline hover:text-purple-800"
                >
                  React Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline hover:text-purple-800"
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
