import {account} from "../appwrite/config";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Account Verification</h1>
        </div>
        <div className="p-6">
          {status.loading ? (
            <div className="flex justify-center">
              <div className="border-4 border-t-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            <div className={`${status.color} font-semibold text-xl text-center`}>
              {status.message}
            </div>
          )}
          {!status.loading && (
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;