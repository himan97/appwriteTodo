import React from "react";
import { Link,NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="w-full h-[75px] px-10 py-4 flex  justify-between bg-sky-400 text-center">
        <Link to="/">
          <img src="../../../src/images/notebookpencil.png" alt="logo"  className="w-auto h-[40px] rounded "/>
        </Link>
        <div className="flex justify-between w-[25%]">
          <NavLink
            to="/"
            className={({ isActive }) =>
             `
            hover:text-red-700
            hover:bg-gray-200
            border-solid border-white
            rounded
            px-2
            py-1
            ${isActive ? "text-red-700" : "text-gray-700"}
            `}
          >
            Home
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              `
             hover:text-red-700
             hover:bg-gray-200
             border-solid border-white
             rounded
             px-2
             py-1
             ${isActive ? "text-red-700" : "text-gray-700"}
             `}
          >
            About
          </NavLink>
          <NavLink
            to="contact"
            className={({ isActive }) =>
              `
             hover:text-red-700
             hover:bg-gray-200
             border-solid border-white
             rounded
             px-2
             py-1
             ${isActive ? "text-red-700" : "text-gray-700"}
             `}
          >
            ContactUs
          </NavLink>
          <NavLink
            to="github"
            className={({ isActive }) =>
              `
             hover:text-red-700
             hover:bg-gray-200
             border-solid border-white
             rounded
             px-2
             py-1
             ${isActive ? "text-red-700" : "text-gray-700"}
             `}
          >
            Github
          </NavLink>
        </div>
        <div>
        <NavLink
            to="login"
            className={({ isActive }) =>
              `
             hover:text-green-700
             hover:bg-gray-200
             border-solid border-white
             rounded
             px-2
             py-1
            
             `}
          >
            Login
          </NavLink>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              `
             hover:text-green-700
             hover:bg-gray-200
             border-solid
            border-white
            bg-slate-700
            text-orange-700
             rounded
             px-2
             py-1
            
             `}
          >
            SignUp
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
