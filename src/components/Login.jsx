import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { account } from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentSession = await account.getSession("current");
        if (currentSession) {
          const userData = await account.get();
          if (userData.emailVerification) {
            dispatch(authLogin(userData));
            navigate("/");
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.log("No active session found", error);
      }
    };
    checkSession();
  }, [dispatch, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const login = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const createSession = await account.createEmailPasswordSession(data.email, data.password);

      if (createSession) {
        const userData = await account.get();

        if (userData.emailVerification) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          await account.deleteSession("current");
          setErrorMessage("User is not verified. Please verify your email.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Sign In</h1>
        </div>
        <div className="p-6">
          <form
            onSubmit={handleSubmit(login)}
            className="space-y-6"
          >
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                id="password-toggle"
                className="absolute inset-y-14 right-0 px-3 flex items-center text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {errorMessage && (
              <div className="text-red-500 text-xs mb-4">{errorMessage}</div>
            )}

            <div className="flex items-center justify-center">
              <button
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <Link
              to="/signup"
              className="block text-center mt-4 text-indigo-600 hover:text-indigo-800 text-sm"
            >
              New User? Click Here!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
