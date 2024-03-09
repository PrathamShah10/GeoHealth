import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../redux/query/user";
import ClipSpinner from "../common/ClipSpinner";
interface RegistrationData {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}

const SignUp = () => {
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});
  const [signUpUser, { loading, error }] = useMutation(SIGNUP_USER);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      notifyA("Invalid email");
      return;
    }
    const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    // Basic password validation (minimum length of 6 characters)
    if (!passRegex.test(registrationData.password)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
      );
      return;
    }

    // If validation passes, proceed with signup
    signUpUser({
      variables: {
        newUserDetails: registrationData,
      },
    });
  };

  const handleChange = (
    e?: React.ChangeEvent<HTMLInputElement>,
    name?: string,
    value?: string
  ) => {
    if (e) {
      let { name, value }: handleChangeProp = e.target;
      setRegistrationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name && value) {
      setRegistrationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  type handleChangeProp = {
    name: string;
    value: string;
  };
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="mainsigninpage min-h-screen flex items-center justify-center ">
      <div className="signinform max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-semibold mb-6">Registration</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Name
            </label>
            <input
              type="string"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Username
            </label>
            <input
              type="string"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sea-green-600 text-white py-2 px-4 rounded-md hover:bg-olive-700 focus:outline-none focus:bg-"
          >
            {!loading ? "Register" : <ClipSpinner isLoading={loading} />}
          </button>
        </form>
        <div className="lins w-full text-center mt-5">
        <Link to="/signin">Have an Account..? <span className="andu  text-sea-green-600 font-bold">Sign in</span> </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
