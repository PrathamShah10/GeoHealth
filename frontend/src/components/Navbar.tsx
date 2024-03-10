import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const dispatch = useAppDispatch();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  return (
    <div className="p-[0.1rem]">
      {user && (
        <div className="sda w-screen bg-white h-16 shadow-md flex justify-between">
          <div className="sda w-screen flex justify-between">
            <div className="icon" onClick={props.handleShowvNavbar}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <img className="logo mt-2 h-12 ml-5" src="./logos.png" alt="" />

            <div className="mini flex">
              <NavLink to="/nearby-hospitals"  className=" ml-3 flex  hover:bg-gray-100 mr-10 h-10 mt-3 ">
                    <h1 className="pl-1 bg-red-500 text-white p-2 shadow-lg rounded-md font-medium text-base tracking-tight">Emergency Transfer</h1>
              </NavLink>
              <Link to="/register-volunteer">
                <h1 className="bv mt-3 rounded-lg mr-5 font-semibold shadow-md text-md">
                  Become Volunteer
                </h1>
              </Link>

              <div>
                <Link to="/profile">
                  <img className="img h-10 m-3" src="./profile.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
