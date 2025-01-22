import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; // Make sure your Firebase is configured

const HostProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profileData, setProfileData] = useState({
    organizationName: "",
    email: "",
    uniqueTag: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    profilePicture: "",
    contestHistory: [],
  });

  const [editing, setEditing] = useState(false);

  // Fetch host profile data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const hostRef = doc(db, "hosts", user.uid);
        const hostDoc = await getDoc(hostRef);
        if (hostDoc.exists()) {
          setProfileData(hostDoc.data());
        } else {
          // If no data exists, initialize with organization name and Gmail
          setProfileData({
            ...profileData,
            organizationName: user.displayName || "",
            email: user.email || "",
            profilePicture: user.photoURL || "",
          });
        }
      }
    };
    fetchData();
  }, [user]);

  // Update profile data in Firestore
  const handleSave = async () => {
    try {
      const hostRef = doc(db, "hosts", user.uid);
      await setDoc(hostRef, profileData, { merge: true });
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Host Profile</h1>
        <div className="flex flex-col items-center">
          <img
            src={profileData.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{profileData.organizationName}</h2>
          <p className="text-gray-600 mb-2">{profileData.email}</p>
          <p className="text-blue-500 italic">{profileData.uniqueTag}</p>

          {!editing ? (
            <>
              <div className="mt-6 text-left w-full">
                <h3 className="font-semibold mb-2">Socials:</h3>
                <p>LinkedIn: {profileData.linkedin || "Not provided"}</p>
                <p>Twitter: {profileData.twitter || "Not provided"}</p>
                <p>Instagram: {profileData.instagram || "Not provided"}</p>

                <h3 className="font-semibold mt-4 mb-2">Contest History:</h3>
                {profileData.contestHistory.length > 0 ? (
                  <ul>
                    {profileData.contestHistory.map((contest, index) => (
                      <li key={index}>{contest}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No contests held yet.</p>
                )}
              </div>
              <button
                onClick={handleEdit}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mt-6 text-left w-full">
                <label className="block mb-2">Unique Tag:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none"
                  type="text"
                  name="uniqueTag"
                  value={profileData.uniqueTag}
                  onChange={handleInputChange}
                />

                <label className="block mb-2">LinkedIn:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none"
                  type="url"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                />

                <label className="block mb-2">Twitter:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none"
                  type="url"
                  name="twitter"
                  value={profileData.twitter}
                  onChange={handleInputChange}
                />

                <label className="block mb-2">Instagram:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none"
                  type="url"
                  name="instagram"
                  value={profileData.instagram}
                  onChange={handleInputChange}
                />

                <label className="block mb-2">Contest History:</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none"
                  name="contestHistory"
                  value={profileData.contestHistory.join("\n")}
                  onChange={(e) =>
                    setProfileData({ ...profileData, contestHistory: e.target.value.split("\n") })
                  }
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostProfilePage;
