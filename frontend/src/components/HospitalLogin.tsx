import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNIN_HOSPITAL } from "../redux/query/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ClipSpinner from "../common/ClipSpinner";
const HospitalLogin = () => {
  const [hospitalLogin, { data }] = useMutation(SIGNIN_HOSPITAL);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const { isPending } = useAppSelector((state) => state.user);
  const loginHospital = () => {
    hospitalLogin({
      variables: {
        signDetails: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    const res = data?.signInHospital;
    if (res) {
      if (res.error) {
        return;
      }
      localStorage.setItem("token", res.token);
      const { _id } = res.userDetails;
      localStorage.setItem("hospital", JSON.stringify({ _id }));
      navigate("/hospital-home");
    }
  }, [data]);
  return (
    <>
     <div className="mainsigninpage min-h-screen flex items-center justify-center">
      <div className="signinform w-1/4 p-6  shadow-md rounded-lg ">
        <h2 className="text-2xl text-center font-semibold mb-6">Hospital Login</h2>
        <div >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
                Hospital Name
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => setName(e.target.value)} 
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
              
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
           
            className="buttonsignin w-1/2 text-white py-2 px-4 rounded-md  focus:outline-none"
            onClick={loginHospital}
          >
            {!isPending ? "SignIn" : <ClipSpinner isLoading={isPending} />}
          </button>
        </div>
        <div className="links w-full text-center mt-5">
        <Link  to="/hospital-register">
          Dont Have an Account..? <span className="andu  text-sea-green-600 font-bold">Register</span> 
        </Link>
        </div>
      </div>
    </div>
   
    </>
    
  );
};

export default HospitalLogin;
