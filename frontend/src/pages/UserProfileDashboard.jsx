import React, { useState } from "react";

const UserProfileDashboard = () => {
  const [bio, setBio] = useState("This is your bio.");
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [hackathonHistory] = useState([
    { name: "Hackathon 1", rank: "1st", won: true },
    { name: "Hackathon 2", rank: "3rd", won: false },
  ]);
  const [formData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    domain: "AI-ML",
    resume: "/path/to/resume.pdf",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    collaborators: ["Alice", "Bob"],
  });

  const handleBioChange = (e) => setBio(e.target.value);

  const handleBioEdit = () => setIsBioEditing(true);

  const handleBioSave = () => setIsBioEditing(false);

  const handleResumeClick = () => {
    // Here you can add functionality to open or download the resume
    window.open(formData.resume, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <div className="mb-4">
          <strong>Name:</strong> {formData.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {formData.email}
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> {formData.phone}
        </div>
        <div className="mb-4">
          <strong>Domain:</strong> {formData.domain}
        </div>
        <div className="mb-4">
          <button
            onClick={handleResumeClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Resume
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Bio</h2>
        {isBioEditing ? (
          <>
            <textarea
              value={bio}
              onChange={handleBioChange}
              rows="4"
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleBioSave}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Bio
            </button>
          </>
        ) : (
          <>
            <p>{bio}</p>
            <button
              onClick={handleBioEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
            >
              Edit Bio
            </button>
          </>
        )}
      </div>

      {/* Hackathon History */}
      <div className="bg-white rounded shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Hackathon History</h2>
        {hackathonHistory.map((hackathon, index) => (
          <div key={index} className="mb-4">
            <strong>{hackathon.name}</strong>
            <div>
              <span>Rank: {hackathon.rank}</span>
              <span className="ml-4">{hackathon.won ? "Won" : "Did Not Win"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
        <div className="mb-4">
          <strong>LinkedIn:</strong> <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">{formData.linkedin}</a>
        </div>
        <div className="mb-4">
          <strong>GitHub:</strong> <a href={formData.github} target="_blank" rel="noopener noreferrer">{formData.github}</a>
        </div>
      </div>

      {/* Collaborators */}
      <div className="bg-white rounded shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Past Collaborators</h2>
        {formData.collaborators.length > 0 ? (
          <ul>
            {formData.collaborators.map((collaborator, index) => (
              <li key={index}>{collaborator}</li>
            ))}
          </ul>
        ) : (
          <p>No past collaborators yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileDashboard;
