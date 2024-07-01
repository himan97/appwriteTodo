import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const toggleConfirmPasswordVisibility = () => {
  //   setConfirmPasswordVisible(!confirmPasswordVisible);
  // };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="********"
            />
            <button
              type="button"
              id="password-toggle"
              className="absolute inset-y-8 right-0 px-3 text-gray-700"
              onClick={togglePasswordVisibility}
            >
              <i className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </button>
          </div>
          {/* <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="confirm-password"
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="********"
            />
            <button
              type="button"
              id="confirm-password-toggle"
              className="absolute inset-y-8 right-0 px-3 text-gray-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              <i className={confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
            </button>
          </div> */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default SignupForm;
