import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { storage } from "../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const HostProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Get current user from Firebase Authentication

  const [domain, setDomain] = useState("");
  const [resumeURL, setResumeURL] = useState(""); // Store resume URL
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(user ? user.photoURL : "");
  const [name, setName] = useState(user ? user.email.split('@')[0] : ""); // Extract name from email
  const [loading, setLoading] = useState(false);

  // Fetch user data on component load
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/user/${user.uid}`
          );
          const data = response.data;
          setDomain(data.domain || ""); // Default to empty if no data
          setGithub(data.github || "");
          setLinkedin(data.linkedin || "");
          setBio(data.bio || "");
          setResumeURL(data.resume || ""); // Default to empty or current resume URL
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle file upload to Firebase storage for resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (
      file &&
      file.size <= 2 * 1024 * 1024 &&
      file.type.includes("pdf") // Validate size and type
    ) {
      const storageRef = ref(storage, `resumes/${user.uid}`);
      setLoading(true);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Resume uploaded, URL:", downloadURL); // Log the URL after upload
        setResumeURL(downloadURL); // Set the resume URL only when a file is uploaded
        alert("Resume uploaded successfully!");
      } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Failed to upload resume.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid file. Only PDFs under 2MB are allowed.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to update the profile
    const updatedData = {
      domain,
      github,
      linkedin,
      bio,
      name, // Include the name
    };

    // Only include the resumeURL if it's not empty
    if (resumeURL) {
      updatedData.resume = resumeURL;
    }

    console.log("Updating profile with data:", updatedData); // Debug the data being sent

    try {
      await axios.put(
        `http://localhost:3000/api/user/${user.uid}`,
        updatedData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Host Profile</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit}>
          {profilePic && (
            <div className="flex justify-center mb-4">``
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-32 h-32"
              />
            </div>
          )}

          {/* Editable Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Handle name change
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={user ? user.email : ""}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Domain
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Domain</option>
              <option>Data Science</option>
              <option>Full Stack Web Dev</option>
              <option>Cyber Security</option>
              <option>AI-ML</option>
              <option>AR-VR</option>
              <option>Cloud Engineering</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              GitHub Profile
            </label>
            <input
              type="url"
              placeholder="Enter GitHub URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              placeholder="Enter LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Resume
            </label>
            <input
              type="file"
              onChange={handleResumeUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {resumeURL && (
              <p className="text-green-500 text-sm mt-2">Resume uploaded!</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio
            </label>
            <textarea
              placeholder="Write a brief bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostProfile;
