import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClipSpinner from "../common/ClipSpinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getSignedUserDetailsAction } from "../redux/action/user";
import { ISignInDetails } from "../interface/user";
import { useNavigate } from "react-router";
const SignIn = () => {
  const [signData, setsignData] = useState<ISignInDetails>();
  const dispatch = useAppDispatch();
  const { isPending } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signData?.username && signData.password) {
      dispatch(getSignedUserDetailsAction(signData));
      setTimeout(() => {
        navigate("/newspage");
      }, 1000);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: handleChangeProp = e.target;
    setsignData((prevData: ISignInDetails | undefined) => ({
      ...prevData,
      [name]: value,
    }));
  };
  type handleChangeProp = {
    name: string;
    value: string;
  };
  return (
    
    <div className="mainsigninpage min-h-screen flex items-center justify-center">
      <div className="signinform w-1/4 p-6  shadow-md rounded-lg ">
        <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            className="buttonsignin w-1/2 text-white py-2 px-4 rounded-md  focus:outline-none"
          >
            {!isPending ? "SignIn" : <ClipSpinner isLoading={isPending} />}
          </button>
        </form>
        <div className="links w-full text-center mt-5">
        <Link  to="/register">
          Dont Have an Account..? <span className="andu  text-sea-green-600 font-bold">Register</span> 
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;