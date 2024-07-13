import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import account from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin} from "../store/authSlice";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  //togglePasswordVisibility is a function of Hide/Show password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const login = async (data) => {
    try {
      var createSession = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      if (createSession) {
        const userData = await account.get();
        
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(login)}
            className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
          >
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
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="mb-6 relative">
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
                {...register("password", {
                  required: true,
                })}
              />
              <button
                type="button"
                id="password-toggle"
                className="absolute inset-y-8 right-0 px-3 text-gray-700"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={
                    passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"
                  }
                ></i>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
