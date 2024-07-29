import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { account } from "../../appwrite/config"; // Import Appwrite config
import Logout from "./Logout";
import SettingsBtn from "./ProfileSettingButton";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (authStatus) {
      fetchUser();
    }
  }, [authStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close dropdown when authStatus changes to false
    if (!authStatus) {
      setDropdownOpen(false);
    }
  }, [authStatus]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="w-full h-[75px] px-10 py-4 flex justify-between bg-blue-600 text-center">
      <div className="flex flex-wrap place-items-center rounded">
        <img
          src="/images/notebook.png"
          alt="logo"
          className="w-auto h-[40px] rounded"
        />
        <span className="font-bold hover:text-black text-gray-800">
          Notebook.
        </span>
      </div>
      <div className="flex flex-wrap justify-between w-[35%]">
        {authStatus && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-bold hover:text-black hover:font-extrabold px-2 py-2 ${
                isActive ? "text-black" : "text-gray-800"
              }`
            }
          >
            DASHBOARD
          </NavLink>
        )}
        {authStatus && (
          <NavLink
            to="about"
            className={({ isActive }) =>
              `font-bold hover:text-black hover:font-extrabold border-solid border-white rounded px-2 py-2 ${
                isActive ? "text-black" : "text-gray-800"
              }`
            }
          >
            ABOUT
          </NavLink>
        )}
        {authStatus && (
          <NavLink
            to="contact"
            className={({ isActive }) =>
              `font-bold hover:text-black hover:font-extrabold border-solid border-white rounded px-2 py-2 ${
                isActive ? "text-black" : "text-gray-800"
              }`
            }
          >
            CONTACT
          </NavLink>
        )}
        {authStatus && (
          <NavLink
            to="github"
            className={({ isActive }) =>
              `font-bold hover:text-black hover:font-extrabold border-solid border-white rounded px-2 py-2 ${
                isActive ? "text-black" : "text-gray-800"
              }`
            }
          >
            GITHUB
          </NavLink>
        )}
      </div>
      <div className="flex flex-wrap items-center">
        {!authStatus && (
          <NavLink
            to="login"
            className="hover:text-white hover:bg-black font-bold rounded-bl-lg rounded-tl-lg px-2 py-2"
          >
            Login
          </NavLink>
        )}
        {!authStatus && (
          <NavLink
            to="signup"
            className="hover:text-green-600 font-bold bg-black text-white rounded-tr-lg rounded-br-lg px-2 py-2"
          >
            SignUp
          </NavLink>
        )}
        {authStatus && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded"
            >
              {user ? user.name : "User"}
              <svg
                className={`ml-2 w-4 h-4 transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 border border-gray-300 rounded shadow-lg hover:bg-gray-100">
                <div className="p-4 border-b border-gray-300">
                  <p className="font-bold">{user ? user.name : "User"}</p>
                  <p className="text-sm">{user ? user.email : "Email not available"}</p>
                </div>
                <div>
                  <SettingsBtn/>
                </div>
                <div className="p-2 hover:bg-gray-200">
                  <Logout />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
