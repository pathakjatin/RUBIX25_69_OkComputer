import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginTypeChange = (type) => setLoginType(type);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      console.log(`${loginType.charAt(0).toUpperCase() + loginType.slice(1)} login successful`, data);

      // Role-based redirection
      if (data.role === "host") {
        navigate("/host");
      } else if (data.role === "mentor") {
        navigate("/mentor");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(`Login failed: ${err.message}`);
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

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
