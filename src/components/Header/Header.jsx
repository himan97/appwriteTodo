import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { account } from "../../appwrite/config"; // Import Appwrite config
import Logout from "./Logout";

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
    <div className="w-full h-[75px] px-10 py-4 flex justify-between bg-indigo-600 text-center">
      <div className="flex items-center">
        <img
          src="/images/notebook.png"
          alt="logo"
          className="w-auto h-[40px] rounded mr-2"
        />
        <span className="font-bold hover:text-black text-gray-800">
          Notebook.
        </span>
      </div>
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full md:w-auto">
        {authStatus && (
          <>
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
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center">
        {!authStatus && (
          <>
            <NavLink
              to="login"
              className="hover:text-white hover:bg-black font-bold rounded-bl-lg rounded-tl-lg px-2 py-2"
            >
              Login
            </NavLink>
            <NavLink
              to="signup"
              className="hover:text-green-600 font-bold bg-black text-white rounded-tr-lg rounded-br-lg px-2 py-2"
            >
              SignUp
            </NavLink>
          </>
        )}
        {authStatus && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md transition duration-200"
            >
              <span className="mr-2">{user ? user.name : "User"}</span>
              <svg
                className={`w-4 h-4 transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } transition-transform duration-200`}
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
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                <div className="py-2 px-4 bg-gray-100 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{user ? user.name : "User"}</p>
                  <p className="text-xs text-gray-600">{user ? user.email : "Email not available"}</p>
                </div>
                <div className="py-2">
                  <div className="md:hidden">
                    <NavLink
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                      onClick={toggleDropdown}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="about"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                      onClick={toggleDropdown}
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                      onClick={toggleDropdown}
                    >
                      Contact
                    </NavLink>
                    <NavLink
                      to="github"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                      onClick={toggleDropdown}
                    >
                      GitHub
                    </NavLink>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <Logout />
                  </div>
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