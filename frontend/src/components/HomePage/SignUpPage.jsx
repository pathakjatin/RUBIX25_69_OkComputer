import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios"; // Import axios
import { auth, googleProvider } from "../../firebase/firebase.config"; // Make sure your firebase config is set up correctly

const SignUpPage = () => {
  const [signUpType, setSignUpType] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    organizationName: "",
    domain: "Data Science",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpTypeChange = (type) => setSignUpType(type);

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName || formData.name,
        email: user.email,
        firebaseUid: user.uid,
        role: signUpType, // Send role (participant, host, mentor)
      };

      // Send Google user data to the backend
      await axios.post("http://localhost:3000/api/user", userData);
      alert(`Sign-up successful! Welcome, ${user.displayName || formData.name}`);
      window.location.href = "/dashboard"; // Redirect after sign-up
    } catch (err) {
      console.error("Google Sign-Up Error:", err.message);
      setError("Google sign-up failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userData = {
        email: formData.email,
        firebaseUid: user.uid,
        name: formData.name,
        phone: formData.phone,
        domain: formData.domain,
        role: signUpType, // Send role (participant, host, mentor)
      };

      // Send data to the backend (manual sign-up)
      await axios.post("http://localhost:3000/api/user", userData);
      window.location.href = "/dashboard"; // Redirect after sign-up
    } catch (err) {
      console.error("Manual Sign-Up Error:", err.message);
      setError(`Sign-up failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up for Virtual Hackathon Platform</h1>

      <div className="flex mb-6 space-x-4">
        {["user", "host", "mentor"].map((type) => (
          <button
            key={type}
            onClick={() => handleSignUpTypeChange(type)}
            className={`py-2 px-4 rounded ${signUpType === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Sign-Up
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleSubmit}>
          {signUpType === "host" ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationName">
                Organization Name
              </label>
              <input
                id="organizationName"
                name="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3"
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>

        <button
          onClick={handleGoogleSignUp}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full rounded"
        >
          Sign Up with Google
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignUpPage;
