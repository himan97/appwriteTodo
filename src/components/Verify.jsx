import {account} from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Verify = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  const [status, setStatus] = useState({
    message: "Verifying your account...",
    color: "text-yellow-600",
    loading: true,
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userVerification = await account.updateVerification(userId, secret);
        if (userVerification) {
          setStatus({
            message: "Account verified. Please logout of any active sessions before logging in.",
            color: "text-green-600",
            loading: false,
          });
        }else {
          setStatus({
            message: "Verification failed. Please try again later.",
            color: "text-red-600",
            loading: false,
          });
        }
      } catch (error) {
        console.error("Verification failed:", error);
       
      }
    };
    verifyUser();
  }, [userId, secret, navigate]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {status.loading && (
        <div className="border-8 border-t-8 border-t-blue-500 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
      )}
      <div className={`${status.color} font-bold text-3xl transition-all duration-500 mt-4`}>
        {status.message}
      </div>
    </div>
  );
};

export default Verify;
