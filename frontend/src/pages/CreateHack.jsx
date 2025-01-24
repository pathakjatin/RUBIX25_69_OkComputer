import React, { useState, useEffect } from "react";
import axios from 'axios'; // Importing axios for making API requests

const API_URI = "http://localhost:5000/api/hackathon"; // API endpoint to create hackathons

const CreateHack = () => {
  const [hackathons, setHackathons] = useState([]);
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHackathon({
      ...newHackathon,
      [name]: value,
    });
  };

  // Function to fetch hackathons from the server (using axios)
  const fetchHackathons = async () => {
    try {
      const response = await axios.get(API_URI); // Make GET request to fetch hackathons
      setHackathons(response.data); // Update state with the fetched hackathons
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    }
  };

  // Handle hackathon creation (using axios)
  const handleCreateHackathon = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Making POST request to create a new hackathon
      const response = await axios.post(API_URI, newHackathon);
      if (response.status === 201) {
        console.log("Hackathon created successfully:", response.data);
        setNewHackathon({ name: "", description: "", startDate: "", endDate: "" });
        fetchHackathons(); // Fetch updated list of hackathons
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
    }
  };

  // Handle hackathon deletion (using axios)
  const handleDeleteHackathon = async (id) => {
    try {
      const response = await axios.delete(`${API_URI}/${id}`);
      if (response.status === 200) {
        fetchHackathons(); // Fetch updated list after deletion
      }
    } catch (error) {
      console.error("Error deleting hackathon:", error);
    }
  };

  // Fetch hackathons on component mount
  useEffect(() => {
    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

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
                    onClick={() => handleDeleteHackathon(hackathon._id)} // Use the _id for deletion
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
