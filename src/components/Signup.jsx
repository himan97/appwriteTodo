import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { account } from "../appwrite/config";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const create = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      registerData(data);
    }
  };

  const registerData = async ({ email, password, name }) => {
    setLoading(true);
    setFormError("");
    setSuccessMessage("");
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const sendVerifyLink = await account.createVerification(
        import.meta.env.VITE_VERIFY_PAGE_ROUTE
      );
      if (sendVerifyLink) {
        setSuccessMessage("Verification link sent. Please check your email.");
        await account.deleteSession("current");
        reset();
      }
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
        </div>
        <div className="p-6">
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Success</p>
              <p>{successMessage}</p>
            </div>
          )}
          <form
            className="space-y-6"
            onSubmit={handleSubmit(create)}
          >
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                id="username"
                type="text"
                placeholder="Username"
                {...register("name", { required: "Username is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

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
                {...register("password", { required: "Password is required" })}
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

            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                id="confirm-password"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                id="confirm-password-toggle"
                className="absolute inset-y-14 right-0 px-3 flex items-center text-gray-600"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {formError && (
              <div className="text-red-600 text-xs mb-4">{formError}</div>
            )}

            <div className="flex items-center justify-center">
              <button
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <Link
              to="/login"
              className="block text-center mt-4 text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Already Have An Account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;