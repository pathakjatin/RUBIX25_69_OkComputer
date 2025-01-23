import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; // Ensure Firebase is configured

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">Host Profile</h1>
        <div className="flex flex-col items-center">
          <img
            src={profileData.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-6 border-4 border-indigo-200 shadow-md"
          />
          <h2 className="text-2xl font-semibold text-indigo-900 mb-2">{profileData.organizationName}</h2>
          <p className="text-gray-700 mb-1">{profileData.email}</p>
          <p className="text-indigo-600 italic mb-4">{profileData.uniqueTag || "No unique tag provided"}</p>

          {!editing ? (
            <>
              <div className="w-full text-left mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Links:</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium text-indigo-800">LinkedIn:</span> {profileData.linkedin || "Not provided"}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium text-indigo-800">Twitter:</span> {profileData.twitter || "Not provided"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-indigo-800">Instagram:</span> {profileData.instagram || "Not provided"}
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Contest History:</h3>
                {profileData.contestHistory.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {profileData.contestHistory.map((contest, index) => (
                      <li key={index}>{contest}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No contests held yet.</p>
                )}
              </div>
              <button
                onClick={() => setEditing(true)}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="w-full text-left mb-6">
                <label className="block font-medium text-gray-800 mb-2">Unique Tag:</label>
                <input
                  type="text"
                  name="uniqueTag"
                  value={profileData.uniqueTag}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block font-medium text-gray-800 mb-2">LinkedIn:</label>
                <input
                  type="url"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block font-medium text-gray-800 mb-2">Twitter:</label>
                <input
                  type="url"
                  name="twitter"
                  value={profileData.twitter}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block font-medium text-gray-800 mb-2">Instagram:</label>
                <input
                  type="url"
                  name="instagram"
                  value={profileData.instagram}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block font-medium text-gray-800 mb-2">Contest History:</label>
                <textarea
                  name="contestHistory"
                  value={profileData.contestHistory.join("\n")}
                  onChange={(e) =>
                    setProfileData({ ...profileData, contestHistory: e.target.value.split("\n") })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
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
