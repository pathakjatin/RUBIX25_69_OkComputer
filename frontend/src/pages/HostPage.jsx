import React from "react";
import { Link } from "react-router-dom";

const HostPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Host Dashboard</h1>
        <p className="text-gray-600">
          Manage your hackathons, invite participants, and track progress all in one place.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/createhack">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
              Create Hackathon
            </button>
          </Link>
          <Link to="/hostprofile">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/manageparticipants">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition">
              Manage Participants
            </button>
          </Link>
          <Link to="/leaderboard">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
              View Teams
            </button>
          </Link>
        </div>

        {/* Key Sections */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">Notifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Your hackathon "AI Challenge 2025" has 30 new participants!</li>
              <li>Team "Innovators" submitted their project for review.</li>
              <li>A participant requested additional resources.</li>
            </ul>
          </div>

          {/* Upcoming Hackathons */}
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Your Hackathons</h2>
            <p className="text-gray-700">Hackathons you're hosting:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>AI Challenge 2025 - Feb 10 to Feb 15</li>
              <li>Web Dev Sprint - Mar 5 to Mar 10</li>
              <li>Cloud Hackathon - Apr 12 to Apr 17</li>
            </ul>
          </div>

          {/* Team Management */}
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-green-800 mb-4">Team Management</h2>
            <p className="text-gray-700">Active teams in your hackathons:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Team Innovators - AI Challenge 2025</li>
              <li>Cloud Wizards - Cloud Hackathon</li>
              <li>Data Gurus - Web Dev Sprint</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-purple-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Resources</h2>
            <p className="text-gray-700">Helpful links for hosting:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>
                <a
                  href="https://firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Firebase Hosting Guide
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
              <li>
                <a
                  href="https://www.postman.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Postman API Testing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPage;
