import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { auth, googleProvider } from "../../firebase/firebase.config"; // Make sure your firebase config is set up correctly

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    domain: "Data Science",
    role: "participant",
    resume: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userData = {
        name: user.displayName || formData.name,
        email: user.email,
        firebaseUid: user.uid,
        role: formData.role, // Send role (participant, host, mentor)
        domain: formData.domain,
        resume: formData.resume, // Optional
      };
  
      // Send Google user data to the backend
      await axios.post("http://localhost:3000/api/user", userData);
      alert(`Sign-up successful! Welcome, ${user.displayName || formData.name}`);
  
      // Redirect based on role
      let redirectPath = "/user"; // Default for 'participant'
      if (formData.role === "host") {
        redirectPath = "/host"; // Redirect to host route
      } else if (formData.role === "mentor") {
        redirectPath = "/mentor"; // Redirect to mentor route
      }
  
      window.location.href = redirectPath; // Redirect to the appropriate page
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
        role: formData.role,
        resume: formData.resume,
      };

      // Send data to the backend (manual sign-up)
      await axios.post("http://localhost:3000/api/user", userData);
      window.location.href = "/login"; // Redirect after sign-up
    } catch (err) {
      console.error("Manual Sign-Up Error:", err.message);
      setError(`Sign-up failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up for Virtual Hackathon Platform</h1>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
              Domain
            </label>
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3"
            >
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Business Development">Business Development</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3"
            >
              <option value="participant">Participant</option>
              <option value="host">Host</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
              Resume
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
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
