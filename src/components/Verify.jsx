import { useEffect } from "react";
import account from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  
   const verifyUser =  async () =>{
        const userVerification = await account.updateVerification(userId, secret);
        if (userVerification) {
          await account.deleteSessions()
          navigate("/login");
        }
       
      }
   verifyUser()

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        
        
        <div className="text-green-600 font-bold text-3xl">
          Your Account Is Verified
        </div>
      </div>
    </>
  );
};

export default Verify;
