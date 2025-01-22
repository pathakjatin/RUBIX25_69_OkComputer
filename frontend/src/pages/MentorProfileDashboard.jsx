import React, { useState } from "react";

const MentorProfilePage = () => {
  const [bio, setBio] = useState("This is your bio.");
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [mentorshipHistory] = useState([
    { teamName: "Team A", rank: "1st", won: true },
    { teamName: "Team B", rank: "2nd", won: false },
  ]);
  const [profilePic, setProfilePic] = useState(null);
  const [formData] = useState({
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+9876543210",
    domain: "AI-ML",
    linkedin: "https://linkedin.com/in/janesmith",
    qualifications: "PhD in AI",
    collaborators: ["John", "Sarah"],
  });

  const handleBioChange = (e) => setBio(e.target.value);
  const handleBioEdit = () => setIsBioEditing(true);
  const handleBioSave = () => setIsBioEditing(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleResumeClick = () => {
    // Functionality to open or download the resume
    window.open("/path/to/resume.pdf", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-4xl mx-auto">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profilePic || "/path/to/default-profile-pic.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="opacity-0 w-0 h-0"
              />
              📸
            </label>
          </div>
        </div>

        {/* Profile Information */}
        <h2 className="text-3xl font-semibold text-center mb-6">Mentor Profile</h2>
        <div className="mb-4 text-xl">
          <strong>Name: </strong>{formData.name}
          <span className="ml-2 text-blue-500 font-bold">✔️ Verified Mentor</span>
        </div>
        <div className="mb-4 text-xl">
          <strong>Email: </strong>{formData.email}
        </div>
        <div className="mb-4 text-xl">
          <strong>Phone: </strong>{formData.phone}
        </div>
        <div className="mb-4 text-xl">
          <strong>Domain: </strong>{formData.domain}
        </div>
        <div className="mb-4 text-xl">
          <strong>Qualifications: </strong>{formData.qualifications}
        </div>

        {/* Resume Section */}
        <div className="mb-6">
          <button
            onClick={handleResumeClick}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            View Resume
          </button>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Bio</h3>
          {isBioEditing ? (
            <>
              <textarea
                value={bio}
                onChange={handleBioChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleBioSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Save Bio
              </button>
            </>
          ) : (
            <>
              <p className="text-lg mb-4">{bio}</p>
              <button
                onClick={handleBioEdit}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600"
              >
                Edit Bio
              </button>
            </>
          )}
        </div>

        {/* Mentorship History Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Mentorship History</h3>
          {mentorshipHistory.map((mentorship, index) => (
            <div key={index} className="mb-4">
              <strong className="text-xl">{mentorship.teamName}</strong>
              <div>
                <span className="text-md">Rank: {mentorship.rank}</span>
                <span className="ml-4 text-md">{mentorship.won ? "Won" : "Did Not Win"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Social Links</h3>
          <div className="mb-4 text-lg">
            <strong>LinkedIn: </strong>
            <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              {formData.linkedin}
            </a>
          </div>
        </div>

        {/* Collaborators Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Past Collaborators</h3>
          {formData.collaborators.length > 0 ? (
            <ul className="list-disc pl-5">
              {formData.collaborators.map((collaborator, index) => (
                <li key={index} className="text-lg">{collaborator}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg">No past collaborators yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;
