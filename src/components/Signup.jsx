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
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const sendVerifyLink = await account.createVerification(
        import.meta.env.VITE_VERIFY_PAGE_ROUTE
      );
      if (sendVerifyLink) {
        alert("Verification link Sent. Please check your email.");
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
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>
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
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
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
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
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
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className="block text-center mt-4 text-blue-500 hover:underline text-sm"
          >
            Already Have An Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
