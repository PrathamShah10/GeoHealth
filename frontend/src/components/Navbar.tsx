import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  return (
    <div>
      {user && (
        <div className="sda w-screen bg-white h-16 shadow-md flex relative z-10 justify-between">
          <div className="sda w-screen flex justify-between">

            <img className="logo h-14 ml-5" src="./logo3.png" alt="" />
            <div className="mini flex">
              <Link to="/newspage">
                <h1 className="mt-4 mr-5 font-semibold text-xl">Home</h1>
              </Link>
              <div><Link to="/profile">
                <img className="img h-10 m-3" src="./profile.png" alt="" />
              </Link>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  dispatch(resetUserData());
                  navigate("/");
                }}
              >
                <img className="h-10 m-3" src="./arrow.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
