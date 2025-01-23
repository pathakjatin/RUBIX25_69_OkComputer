// src/components/HostDashboard.js
import React, { useState } from "react";

const CreateHack = () => {
  const [hackathons, setHackathons] = useState([]);
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHackathon({
      ...newHackathon,
      [name]: value,
    });
  };

  const handleCreateHackathon = (e) => {
    e.preventDefault();
    // Add new hackathon to the list
    setHackathons([...hackathons, newHackathon]);
    // Clear form
    setNewHackathon({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleDeleteHackathon = (index) => {
    const updatedHackathons = hackathons.filter((_, i) => i !== index);
    setHackathons(updatedHackathons);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Host Dashboard</h1>

      {/* Create Hackathon Form */}
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Hackathon</h2>
        <form onSubmit={handleCreateHackathon}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Hackathon Name</label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              name="name"
              value={newHackathon.name}
              onChange={handleInputChange}
              placeholder="Hackathon Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              name="description"
              value={newHackathon.description}
              onChange={handleInputChange}
              placeholder="Brief Description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Start Date</label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="date"
              name="startDate"
              value={newHackathon.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">End Date</label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="date"
              name="endDate"
              value={newHackathon.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
            type="submit"
          >
            Create Hackathon
          </button>
        </form>
      </div>

      {/* List of Hackathons */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4">Manage Your Hackathons</h2>
        {hackathons.length === 0 ? (
          <p className="text-gray-600">No hackathons created yet.</p>
        ) : (
          <ul className="space-y-4">
            {hackathons.map((hackathon, index) => (
              <li key={index} className="bg-white p-4 rounded shadow-md flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{hackathon.name}</h3>
                  <p className="text-gray-600">{hackathon.description}</p>
                  <p className="text-gray-500">
                    {hackathon.startDate} to {hackathon.endDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteHackathon(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateHack;
