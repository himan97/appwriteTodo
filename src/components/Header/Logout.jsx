import React from "react";
import {account} from "../../appwrite/config";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const logoutSessions = await account.deleteSession("current");
    if (logoutSessions) {
      dispatch(authLogout());
      navigate("/login");
    }
  };

  return (
    <>
      <div
        className="cursor-pointer
         hover:text-green-600
               font-bold
             bg-black
              
              text-white
          
             rounded-lg
             
             px-2
             py-2
          "
        onClick={logoutHandler}
      >
        Logout
      </div>
    </>
  );
};

export default Logout;
