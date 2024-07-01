import React from "react";
import { Link,NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="w-full h-[75px] px-10 py-4 flex  justify-between bg-sky-400 text-center">
        <Link to="/" className="flex flex-wrap  place-items-center rounded  ">
          <img src="../../../src/images/notebookpencil.png" alt="logo"  className="w-auto h-[40px] rounded "/>
          <span className="font-bold hover:text-black  text-gray-800 ">notebook.</span>
        </Link>
        <div className="flex  flex-wrap justify-between w-[25%]">
          <NavLink
            to="/"
            className={({ isActive }) =>
             `
            font-bold
            
            hover:text-black
            hover:font-extrabold
            
            border-solid border-white
            rounded
           px-2
             py-2
            ${isActive ? "text-black" : "text-gray-700"}
            `}
          >
            HOME
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              `
            font-bold
             hover:text-black
             hover:font-extrabold
             
             border-solid border-white
             rounded
             px-2
             py-2
             ${isActive ? "text-black" : "text-gray-700"}
             `}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="contact"
            className={({ isActive }) =>
              `
            font-bold
             hover:text-black
             hover:font-extrabold
             border-solid border-white
             rounded
             px-2
             py-2
             ${isActive ? "text-black" : "text-gray-700"}
             `}
          >
            CONTACT
          </NavLink>
          <NavLink
            to="github"
            className={({ isActive }) =>
              `
            font-bold
             hover:text-black
             hover:font-extrabold
             border-solid border-white
             rounded
             px-2
             py-2
             ${isActive ? "text-black" : "text-gray-700"}
             `}
          >
            GITHUB
          </NavLink>
        </div>
        <div className="flex flex-wrap">
        <NavLink
            to="login"
            className={({ isActive }) =>
              `
             hover:text-green-700
             hover:bg-slate-700
             font-bold
             border-solid border-white
             rounded-bl-xl
             rounded-tl-xl
            px-2
             py-2
            
             `}
          >
            Login
          </NavLink>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              `
             hover:text-green-700
             
             font-bold
            
            bg-slate-700
            text-orange-700
             rounded-tr-xl
             rounded-br-xl
             
             px-2
             py-2
            
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
