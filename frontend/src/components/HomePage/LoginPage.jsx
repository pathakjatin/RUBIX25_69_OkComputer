import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config"; // Adjust based on your Firebase config

const LoginPage = () => {
  const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLoginTypeChange = (type) => setLoginType(type);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before attempting login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(`${loginType.charAt(0).toUpperCase() + loginType.slice(1)} login successful`);
      
      // Role-based redirection
      if (loginType === "host") {
        navigate("/host");
      } else if (loginType === "mentor") {
        navigate("/mentor");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(`Login failed: ${err.message}`);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(`${user.displayName} logged in with Google`);

      // Role-based redirection after Google login
      if (loginType === "host") {
        navigate("/host");
      } else if (loginType === "mentor") {
        navigate("/mentor");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Google Login Error:", err.message);
      setError(`Google login failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login to Virtual Hackathon Platform</h1>

      <div className="flex mb-6 space-x-4">
        {["user", "host", "mentor"].map((type) => (
          <button
            key={type}
            onClick={() => handleLoginTypeChange(type)}
            className={`py-2 px-4 rounded ${loginType === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Login
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login as {loginType.charAt(0).toUpperCase() + loginType.slice(1)}
            </button>
          </div>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full rounded"
        >
          Login with Google
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;