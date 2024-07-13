import { useEffect } from "react";
import account from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  useEffect( () => {
    async () =>{
        const updateUserVerify = await account.updateVerification(userId, secret);
        if (updateUserVerify) {
          navigate("/login");
        }
    }
   
  }, [updateUserVerify]);

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div>Your UserId:{userId} & Your Secret:{secret}</div>
        
        <div className="text-green-600 font-bold text-3xl">
          Your Account Is Verified
        </div>
      </div>
    </>
  );
};

export default Verify;
