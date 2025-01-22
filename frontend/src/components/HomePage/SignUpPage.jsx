// src/components/SignUpPage.js
import React, { useState } from "react";

const SignUpPage = () => {
  const [signUpType, setSignUpType] = useState("user");
  const [resume, setResume] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organizationName: "",
    domain: "Data Science",
  });

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleQualificationChange = (e) => {
    setQualification(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUpTypeChange = (type) => {
    setSignUpType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    if (signUpType === "user" || signUpType === "mentor") {
      console.log("Resume: ", resume);
    }
    if (signUpType === "mentor") {
      console.log("Qualification: ", qualification);
    }
    // Handle the form submission logic here (e.g., sending data to backend)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up for Virtual Hackathon Platform</h1>

      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => handleSignUpTypeChange("user")}
          className={`py-2 px-4 rounded ${
            signUpType === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          User Sign-Up
        </button>
        <button
          onClick={() => handleSignUpTypeChange("host")}
          className={`py-2 px-4 rounded ${
            signUpType === "host" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Host Sign-Up
        </button>
        <button
          onClick={() => handleSignUpTypeChange("mentor")}
          className={`py-2 px-4 rounded ${
            signUpType === "mentor" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Mentor Sign-Up
        </button>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleSubmit}>
          {signUpType === "user" || signUpType === "mentor" ? (
            <>
              {/* Common fields for User and Mentor */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

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

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
                  Upload Resume
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="resume"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
                  Select Domain
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                >
                  <option>Data Science</option>
                  <option>Full Stack Web Dev</option>
                  <option>Cyber Security</option>
                  <option>AI-ML</option>
                  <option>AR-VR</option>
                  <option>Cloud Engineering</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Host Sign-Up */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationName">
                  Organization Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="organizationName"
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  required
                />
              </div>

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
            </>
          )}

          {signUpType === "mentor" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">
                  Upload Qualification (PhD/Experience)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="qualification"
                  type="file"
                  onChange={handleQualificationChange}
                  required
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {signUpType === "user" && "Sign Up as User"}
              {signUpType === "host" && "Sign Up as Host"}
              {signUpType === "mentor" && "Sign Up as Mentor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
