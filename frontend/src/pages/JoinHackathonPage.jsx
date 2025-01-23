import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const JoinHackathonPage = () => {
  const { hackathonId } = useParams(); // Get the hackathonId from the URL
  const navigate = useNavigate(); // useNavigate hook for navigation
  
  const [teamName, setTeamName] = useState('');
  const [teammates, setTeammates] = useState([{ name: '' }]); // Initial state with the user (name of the user)

  const handleAddTeammate = () => {
    if (teammates.length < 4) { // Limit total team size to 4 (including the user)
      setTeammates([...teammates, { name: '' }]);
    } else {
      alert("You can only add up to 3 teammates, for a total of 4.");
    }
  };

  const handleTeammateChange = (index, value) => {
    const newTeammates = [...teammates];
    newTeammates[index].name = value;
    setTeammates(newTeammates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission of form data here (send to backend or state)
    console.log('Team Data:', { teamName, teammates });
    
    // After submission, navigate to the hackathon's main page or confirmation page
    navigate(`/hackathon/${hackathonId}`);
  };

  // Handle the matchmaking redirection
  const handleMatchmaking = () => {
    navigate(`/matchmaking`);
  };

  return (
    <div className="join-hackathon-page p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10">Join Hackathon {hackathonId}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-xl font-semibold mb-2">Your Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            className="w-full p-4 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Teammates</h2>
          {teammates.map((teammate, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={teammate.name}
                onChange={(e) => handleTeammateChange(index, e.target.value)}
                placeholder={`Teammate #${index + 1}`}
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTeammate}
            className="bg-yellow-500 text-blue-800 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Add Another Teammate
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Link to = "/leaderboard">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button></Link>
          <button
            type="button"
            onClick={handleMatchmaking}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add from Matchmaking
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinHackathonPage;
