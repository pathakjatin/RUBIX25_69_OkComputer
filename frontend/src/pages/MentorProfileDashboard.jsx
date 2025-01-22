import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"; // Firebase Auth import for user data
import { storage } from "../firebase"; // Assume firebase is initialized in a separate file
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MentorProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Get current user from Google sign-in

  // State to store the editable fields
  const [domain, setDomain] = useState("AI-ML");
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState("");
  const [qualification, setQualification] = useState(null);
  const [qualificationURL, setQualificationURL] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  
  // To fetch and store the profile picture
  const [profilePic, setProfilePic] = useState(user ? user.photoURL : "");

  useEffect(() => {
    if (user) {
      setProfilePic(user.photoURL);
    }
  }, [user]);

  // Handle file upload to Firebase storage for resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    setResume(file);

    if (file) {
      const storageRef = ref(storage, `mentorResumes/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setResumeURL(downloadURL);
    }
  };

  // Handle file upload for qualification
  const handleQualificationUpload = async (e) => {
    const file = e.target.files[0];
    setQualification(file);

    if (file) {
      const storageRef = ref(storage, `mentorQualifications/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setQualificationURL(downloadURL);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data logic here (could be sent to Firebase Firestore or Realtime DB)
    console.log("Mentor Profile Updated: ", {
      domain,
      resumeURL,
      qualificationURL,
      github,
      linkedin,
      bio,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mentor Profile</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit}>
          {/* Display Google profile picture */}
          {profilePic && (
            <div className="flex justify-center mb-4">
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-32 h-32"
              />
            </div>
          )}

          {/* Display name and Gmail from Google sign-in */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={user ? user.displayName : ""}
              disabled
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

          {/* Editable fields for Domain, GitHub, LinkedIn, Resume, Bio */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Domain
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={domain}
              onChange={(e) => handleInputChange(e, setDomain)}
            >
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
              onChange={(e) => handleInputChange(e, setGithub)}
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
              onChange={(e) => handleInputChange(e, setLinkedin)}
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
              Upload Qualification (PhD/Experience)
            </label>
            <input
              type="file"
              onChange={handleQualificationUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {qualificationURL && (
              <p className="text-green-500 text-sm mt-2">Qualification uploaded!</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio
            </label>
            <textarea
              placeholder="Write a brief bio"
              value={bio}
              onChange={(e) => handleInputChange(e, setBio)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorProfilePage;
