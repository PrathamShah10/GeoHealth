import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../redux/query/user";
import ClipSpinner from "../common/ClipSpinner";
const SignUp = () => {
  const [registrationData, setRegistrationData] = useState({});
  const [signUpUser, { loading, error }] = useMutation(SIGNUP_USER);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Registration</h2>
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
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {!loading ? "Register" : <ClipSpinner isLoading={loading} />}
          </button>
        </form>
        <Link to="/">Sign In if Account alrady exists</Link>
      </div>
    </div>
  );
};

export default SignUp;
