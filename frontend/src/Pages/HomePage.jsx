import React, { useEffect, useState } from "react";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("SignIn");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-purple-600">
          Campus Buddy
        </h1>
      </div>

      {/* SignIn/SignUp Section */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Flex container to keep buttons aligned horizontally */}
        <div className="flex justify-center space-x-2 mb-6 border-b border-gray-300">
          {/* Sign In Button */}
          <button
            className={`w-1/2 py-2 text-center font-medium transition-colors ${
              activeTab === "SignIn"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("SignIn")}
          >
            SIGN IN
          </button>

          {/* Sign Up Button */}
          <button
            className={`w-1/2 py-2 text-center font-medium transition-colors ${
              activeTab === "SignUp"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("SignUp")}
          >
            SIGN UP
          </button>
        </div>

        {/* Display SignIn or SignUp Form with a fixed minimum height */}
        <div className="mt-4 min-h-[400px]">
          {" "}
          {/* Adjust the min-height as needed */}
          {activeTab === "SignIn" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
