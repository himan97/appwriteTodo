import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import account from "../appwrite/config";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");

  // Get the value of password field to compare with confirm password
  const password = watch("password");

  // togglePasswordVisibility is a function of Hide/Show password visibility
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
    try {
      var createUser = await account.create(ID.unique(), email, password, name);
      var session = await account.createEmailPasswordSession(email,password);
      var sendVerifyLink = await account.createVerification(
        "http://localhost:5173/verify"
      );
      if (sendVerifyLink) {
        alert("Verification e-mail Sent");
        navigate("/login");
      }
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(create)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              {...register("name", { required: "Username is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              id="password-toggle"
              className="absolute inset-y-8 right-0 px-3 text-gray-700"
              onClick={togglePasswordVisibility}
            >
              <i
                className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
              className="absolute inset-y-8 right-0 px-3 text-gray-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              <i
                className={
                  confirmPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"
                }
              ></i>
            </button>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs italic ">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {formError && <div className="text-red-600">{formError}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
