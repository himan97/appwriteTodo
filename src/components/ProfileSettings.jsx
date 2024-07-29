import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const exitSettings = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-md  bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={exitSettings}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 bg-gray-200"
          />
          <div className="text-center mb-4">
            <div className="text-gray-600">UserId</div>
            <div className="text-lg font-semibold text-gray-800">Name</div>
            <div className="text-gray-500">email@example.com</div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
