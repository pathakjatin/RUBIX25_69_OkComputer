import React, { useState } from "react";

const ManageParticipantsPage = () => {
  const [participants, setParticipants] = useState([
    { name: "Alice Johnson", email: "alice@example.com", domain: "AI/ML", role: "Team Leader" },
    { name: "Bob Smith", email: "bob@example.com", domain: "Full Stack", role: "Participant" },
    { name: "Charlie Brown", email: "charlie@example.com", domain: "Cyber Security", role: "Team Leader" },
    { name: "Diana Prince", email: "diana@example.com", domain: "AR/VR", role: "Participant" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveParticipant = (email) => {
    setParticipants(participants.filter((participant) => participant.email !== email));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Manage Participants</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or domain..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Participants Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="p-4 border border-gray-200 text-left">Name</th>
                <th className="p-4 border border-gray-200 text-left">Email</th>
                <th className="p-4 border border-gray-200 text-left">Domain</th>
                <th className="p-4 border border-gray-200 text-left">Role</th>
                <th className="p-4 border border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4 border border-gray-200">{participant.name}</td>
                    <td className="p-4 border border-gray-200">{participant.email}</td>
                    <td className="p-4 border border-gray-200">{participant.domain}</td>
                    <td className="p-4 border border-gray-200">{participant.role}</td>
                    <td className="p-4 border border-gray-200 text-center">
                      <button
                        onClick={() => handleRemoveParticipant(participant.email)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-600 py-4 italic"
                  >
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageParticipantsPage;
