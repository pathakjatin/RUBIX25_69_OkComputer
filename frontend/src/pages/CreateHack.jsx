import React, { useState, useEffect } from "react";

const API_URI = "http://localhost:5000/api/hackathon";

const CreateHack = () => {
  const [hackathons, setHackathons] = useState([]);
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Hackathons
  const fetchHackathons = async () => {
    setLoading(true); // Set loading to true while fetching
    setError(null); // Reset error state
    try {
      const response = await fetch(API_URI);
      if (!response.ok) {
        throw new Error("Failed to fetch hackathons");
      }
      const data = await response.json();
      setHackathons(data); // Set the fetched hackathons to state
    } catch (error) {
      setError("Error fetching hackathons");
      console.error("Error fetching hackathons:", error);
    }finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Run the fetch on component mount
  useEffect(() => {
    fetchHackathons(); 
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHackathon({
      ...newHackathon,
      [name]: value,
    });
  };

  // Handle form submission for creating a new hackathon
  const handleCreateHackathon = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHackathon),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Hackathon created successfully with ID:", data.id);

        // Clear the form
        setNewHackathon({ name: "", description: "", startDate: "", endDate: "" });

        // Fetch updated list of hackathons after creation
        fetchHackathons();
      } else {
        console.error("Error creating hackathon:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
    }
  };

  return (
    <div className="create-hack-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Hackathon Form */}
      <form onSubmit={handleCreateHackathon} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create New Hackathon</h2>
        
        <div>
          <input
            type="text"
            name="name"
            value={newHackathon.name}
            onChange={handleInputChange}
            placeholder="Hackathon Name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div>
          <textarea
            name="description"
            value={newHackathon.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              name="startDate"
              value={newHackathon.startDate}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="date"
              name="endDate"
              value={newHackathon.endDate}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
  
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? "Creating..." : "Create Hackathon"}
        </button>
      </form>
  
      {/* List of Hackathons */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Hackathons</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading hackathons...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : hackathons.length === 0 ? (
          <p className="text-center text-gray-600">No hackathons created yet.</p>
        ) : (
          <ul className="space-y-4">
            {hackathons.map((hackathon) => (
              <li key={hackathon.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">{hackathon.name}</h3>
                <p className="text-gray-600">{hackathon.description}</p>
                <p className="text-gray-500">
                  {new Date(hackathon.startDate).toLocaleDateString()} to {new Date(hackathon.endDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
  
export default CreateHack;
