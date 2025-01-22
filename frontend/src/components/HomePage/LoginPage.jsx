import React, { useState } from "react";

const LoginPage = () => {
  const [loginType, setLoginType] = useState("user");

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login to Virtual Hackathon Platform</h1>

      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => handleLoginTypeChange("user")}
          className={`py-2 px-4 rounded ${
            loginType === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          User Login
        </button>
        <button
          onClick={() => handleLoginTypeChange("host")}
          className={`py-2 px-4 rounded ${
            loginType === "host" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Host Login
        </button>
        <button
          onClick={() => handleLoginTypeChange("mentor")}
          className={`py-2 px-4 rounded ${
            loginType === "mentor" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Mentor Login
        </button>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {loginType === "user" && "Login as User"}
              {loginType === "host" && "Login as Host"}
              {loginType === "mentor" && "Login as Mentor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
