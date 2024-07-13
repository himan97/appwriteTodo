import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <>
      <div className="w-full h-[75px] px-10 py-4 flex  justify-between bg-sky-400 text-center">
        <Link to="/" className="flex flex-wrap  place-items-center rounded  ">
          <img
            src="../../../src/images/notebookpencil.png"
            alt="logo"
            className="w-auto h-[40px] rounded "
          />
          <span className="font-bold hover:text-black  text-gray-800 ">
            Notebook.
          </span>
        </Link>
        <div className="flex  flex-wrap justify-between w-[25%]">
          {authStatus && (
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
            `
              }
            >
              HOME
            </NavLink>
          )}
          {authStatus && (
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
             `
              }
            >
              ABOUT
            </NavLink>
          )}
          {authStatus && (
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
             `
              }
            >
              CONTACT
            </NavLink>
          )}
          {authStatus && (
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
             `
              }
            >
              GITHUB
            </NavLink>
          )}
        </div>
        <div className="flex flex-wrap">
          {!authStatus && (
            <NavLink
              to="login"
              className={() =>
                `
           
              
             hover:text-green-700
             hover:bg-slate-700
              
             font-bold
             
             rounded-bl-xl
             rounded-tl-xl
            px-2
             py-2
            
             `
              }
            >
              Login
            </NavLink>
          )}
          {!authStatus && (
            <NavLink
              to="signup"
              className={() =>
                `
             hover:text-green-700
              
           
             font-bold
            
            bg-slate-700
            text-orange-700
             rounded-tr-xl
             rounded-br-xl
             
             px-2
             py-2
            
             `
              }
            >
              SignUp
            </NavLink>
          )}
          {authStatus && <Logout />}
        </div>
      </div>
    </>
  );
};

export default Header;
