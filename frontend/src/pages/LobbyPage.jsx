import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample teammates data (replace with actual data fetching logic)
const teammates = [
  { id: 1, name: 'Krish Parmar' },
  { id: 2, name: 'Teammate 1' },
  { id: 3, name: 'Teammate 2' },
  { id: 4, name: 'Teammate 3' }
];

const LobbyPage = () => {
  const navigate = useNavigate();

  const handleVideoCall = () => {
    navigate('/video');  // Replace with the actual route of your video call page
  };

  const handleChat = () => {
    navigate('/room');  // Replace with the actual route of your chat page
  };

  return (
    <div className="lobby-page flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Team Lobby</h1>
      
      <div className="team-list w-1/2">
        {teammates.map((teammate) => (
          <div key={teammate.id} className="teammate-card bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center">
            <span className="teammate-name text-lg font-medium">{teammate.name}</span>
            <div className="buttons">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleVideoCall}
              >
                Video Call
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleChat}
              >
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;
