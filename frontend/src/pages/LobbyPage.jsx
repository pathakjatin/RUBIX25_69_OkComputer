import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample teammates data (replace with actual data fetching logic)
const teammates = [
  { id: 1, name: 'Teammate 1' },
  { id: 2, name: 'Teammate 2' },
  { id: 3, name: 'Teammate 3' },
  { id: 4, name: 'Teammate 4' }
];

const LobbyPage = () => {
  const navigate = useNavigate();
  const [githubLinks, setGithubLinks] = useState({}); // State for GitHub links

  const handleVideoCall = () => {
    navigate('/video'); // Replace with the actual route of your video call page
  };

  const handleGroupChat = () => {
    navigate('/room'); // Replace with the actual route of your group chat page
  };

  const handleGithubChange = (id, value) => {
    setGithubLinks({ ...githubLinks, [id]: value });
  };

  return (
    <div className="lobby-page flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Team Lobby</h1>
      
      <div className="team-list w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Teammates</h2>
        {teammates.map((teammate) => (
          <div
            key={teammate.id}
            className="teammate-card bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span className="teammate-name text-lg font-medium text-gray-800">{teammate.name}</span>
            <input
              type="text"
              placeholder="Enter GitHub Link"
              value={githubLinks[teammate.id] || ''}
              onChange={(e) => handleGithubChange(teammate.id, e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mr-4 w-1/3 text-gray-600"
            />
          </div>
        ))}

        <div className="group-actions flex justify-center space-x-6 mt-6">
          <button
            onClick={handleVideoCall}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Start Video Call
          </button>
          <button
            onClick={handleGroupChat}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Open Group Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
